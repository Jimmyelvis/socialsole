const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Article model
const Article = require("../../models/Article");
// Profile model
const Profile = require("../../models/Profile");

// Validation
const validatePostInput = require("../../validation/article");
const validateComments = require("../../validation/comments");



// @route   GET api/articles
// @desc    Get articles
// @access  Public
router.get("/", (req, res) => {
  Article.find()
    .populate('user', ['name', 'avatar'])
    .sort({ date: -1 })
    .then(articles  => res.json(articles))
    .catch(err => res.status(404).json({ nopostsfound: "No articles found" }));
});

// @route   GET api/articles/:id
// @desc    Get article by id
// @access  Public
router.get("/:id", (req, res) => {
  Article.findById(req.params.id)
    .populate('user', ['name', 'avatar', 'email'])
    .then(article => res.json(article))
    .catch(err =>
      res.status(404).json({ nopostsfound: "No article found with that ID" })
    );
});

// @route   GET api/posts/:id/:tags
// @desc    Get related articles by id and tags
// @access  Public
router.get("/tags/:tags", (req, res) => {

   array = req.params.tags.split(',')
  Article.find({tags: {$in : array }} )
  .then(articles => articles.slice(0, 3))
  .then(articles => res.json(articles))
  .catch(err => res.status(404).json({ noarticlesfound: "No articles found here" }));
});

// @route   GET api/article/address/:address
// @desc    Get article by address
// @access  Public

router.get('/address/:address', (req, res) => {
  const errors = {};

  Article.findOne({
      address: req.params.address
    })
    .then(article => {
      if (!article) {
        errors.noprofile = 'There is no article here';
        res.status(404).json(errors);
      }

      res.json(article);
    })
    .catch(err => res.status(404).json(err));
});



// @route   POST api/articles
// @desc    Create article 
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    var tags;

    // Tags - Spilt into array
    if (typeof req.body.tags !== "undefined") {
      tags = req.body.tags.split(",");
    }

    const newArticle = new Article({
      user: req.user.id,
      text: req.body.text,
      headline: req.body.headline,
      fullheaderimage: req.body.fullheaderimage,
      articleheaderimage: req.body.articleheaderimage,
      tags: tags
    });

    newArticle.save().then(article => res.json(article));

  }
);



// @route UPDATE api/article/:id
// @desc get single article by id then update
// @access private
router.post('/:id', passport.authenticate('jwt', { session: false }),
  (req, res) => {

  const { errors, isValid } = validatePostInput(req.body)

      //check validation
      if(!isValid){
          //if any errors send 404
          return res.status(400).json(errors)
      }


      const headline = req.body.headline;
      const text = req.body.text;
      const fullheaderimage = req.body.fullheaderimage;
      const articleheaderimage = req.body.articleheaderimage;

      var tags
      
      if (typeof req.body.tags !== "undefined") {
        tags = req.body.tags.split(",");
      }

      
  Article.findByIdAndUpdate({_id: req.params.id},
    {
      $set: {
        headline,
        text,
        fullheaderimage,
        articleheaderimage,
        tags
      }
    },
    { new: true }
  )
  .then(article => {

    /*
      Make sure the user who is making the update request is the 
      same person who originally created the post
    */
    if(article.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: 'User not authorizated'})
    }
    article.save().then(article => res.json(article))
  })
  .catch(err => res.status(404).json({ articlenotfound: 'No article found'}))
})


// @route   DELETE api/articles/:id
// @desc    Delete article
// @access  Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
      Article.findById(req.params.id)
        .then(article => {
          if (article.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          article.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No article found" }));
  }
);

// @route   POST api/articles/like/:id
// @desc    Like article
// @access  Private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Article.findById(req.params.id)
        .then(article => {

          /*
            Check through the likes array to see if there's already an 
            entry by the user making the request. If so return an error
          */
          if (
            article.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "You already liked this article" });
          }

          // Add user id to likes array
          article.likes.unshift({ 
            user: req.user.id
           });
          article.save().then(article => res.json(article));
        })
        .catch(err => res.status(404).json({ postnotfound: "No article found" }));
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    UNLike post
// @access  Private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Article.findById(req.params.id)
        .then(article => {

           /*
            Check through the likes array to see if there's an 
            entry by the user making the request. If not return an error
          */
          if (
            article.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this article" });
          }

          // Get remove index
          const removeIndex = article.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          article.likes.splice(removeIndex, 1);

          // Save
          article.save().then(article => res.json(article));
        })
        .catch(err => res.status(404).json({ postnotfound: "No article found" }));
    });
  }
);

// @route   POST api/articles/comment/:id
// @desc    Add comment to article
// @access  Private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateComments(req.body);

    //Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Article.findById(req.params.id)
      .populate('user', ['name', 'avatar'])
      .then(article => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
          handle: req.body.handle
          // msg: 'Comment Submitted'
        };

        // Add to comments array
        article.comments.push(newComment);

        // Save
        article.save().then(article => res.json(article));
        
      })
      .catch(err => res.status(404).json({ postnotfound: "No article found" }));
  }
);

// @route   DELETE api/article/comment/:id/:comment_id
// @desc    Remove comment from article
// @access  Private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Article.findById(req.params.id)
      .populate('user', ['name', 'avatar'])
      .then(article => {
        // Check to see if comment exists

        if (
          article.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = article.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        article.comments.splice(removeIndex, 1);

        article.save().then(article => res.json(article));

      })
      .catch(err => res.status(404).json({ postnotfound: "No article found" }));
  }
);

module.exports = router;