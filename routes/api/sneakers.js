const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Load Profile Model
const Sneaker = require("../../models/Sneaker");
const Profile = require("../../models/Profile");
const User = require("../../models/User");


// @route   GET api/sneakers
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Sneaker.find()
    .populate('user', ['name', 'avatar'])
    .sort({ date: -1 })
    .then(sneakers => res.json(sneakers))
    .catch(err => res.status(404).json({ nopostsfound: "No sneakers found" }));
});


// @route   GET api/sneakers
// @desc    Get Most Popular Sneakers
// @access  Public



router.get("/mostliked", (req, res) => {

  Sneaker.aggregate(
    [
    { "$project" : {
      "user" : 1,
      "profile" : 1,
      "model" : 1,
      "colorway" : 1,
      "year" : 1,
      "text" : 1,
      "mainimage" : 1,
      "subimage_1" : 1,
      "subimage_2" : 1,
      "subimage_3" : 1,
      "subimage_4" : 1,
      "tags"  : 1,
      "comments" : 1,
      "likes" : 1,
      "date" : 1,
      "likeslength" : { "$size": "$likes" }
    }},
    {"$sort": { "likeslength": -1 }},
    {"$limit": 5 }
  ],
    function(err, results) {
      if (err) {
        return err
      }
      return res.json(results)
    });
  })

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
  Sneaker.findById(req.params.id)
  .populate(
    'user', ['name', 'avatar']
    )
  .populate(
    'profile', ['avatar']
    )
  .then(sneakers => res.json(sneakers))
  .catch(err =>
      res.status(404).json({ nopostsfound: "No sneaker found with that ID" })
    );
});

// @route   GET api/sneakers/:id/:tags
// @desc    Get related sneakers by id and tags
// @access  Public
router.get("/tags/:tags", (req, res) => {

  array = req.params.tags.split(',')
  Sneaker.find({tags: {$in : array }} )
  .then(sneakers => sneakers.slice(0, 3))
  .then(sneakers => res.json(sneakers))
  .catch(err => res.status(404).json({ nosneakersfound: "No sneakers found here" }));
});


// @route   GET api/sneaker/user/:user_id
// @desc    Get Sneakers by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Sneaker.find({
      user: req.params.user_id
    })
    .populate('user', ['name', 'avatar'])
    .then(sneaker => {
      if (!sneaker) {
        errors.noprofile = 'There is no sneaker for this user';
        res.status(404).json(errors);
      }

      res.json(sneaker);
    })
    .catch(err => res.status(404).json({
      sneaker: 'There is no sneaker for this user'
    }))
});

// @route   GET api/sneaker/user/:handle
// @desc    Get Sneakers by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Sneaker.find({
    handle: req.params.handle
    })
    .populate('user', ['name', 'avatar'])
    .then(sneaker => {
      if (!sneaker) {
        errors.noprofile = 'There is no sneaker for this user';
        res.status(404).json(errors);
      }

      res.json(sneaker);
    })
    .catch(err => res.status(404).json({
      sneaker: 'There is no sneaker for this user'
    }))
});



// @route   SNEAKER api/sneakers
// @desc    Create sneaker 
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {

    var tags;

    if (typeof req.body.tags !== "undefined") {
      tags = req.body.tags.split(",");
    }
    

    const newSneaker = new Sneaker({
      model: req.body.model,
      colorway: req.body.colorway,
      year: req.body.year,
      text: req.body.text,
      mainimage: req.body.mainimage,
      subimage_1: req.body.subimage_1,
      subimage_2: req.body.subimage_2,
      subimage_3: req.body.subimage_3,
      subimage_4: req.body.subimage_4,
      user: req.user.id,
      tags: tags
    });

    newSneaker.save().then(sneaker => res.json(sneaker));

  }
);

// route UPDATE api/posts/:id
// get single post by id then update
// access private
router.post('/:id', passport.authenticate('jwt', { session: false }),
  (req, res) => {


  // const { errors, isValid } = validatePostInput(req.body)

  //check validation
      // if(!isValid){
      //     //if any errors send 404
      //     return res.status(400).json(errors)
      // }


      const model = req.body.model;
      const colorway = req.body.colorway;
      const year = req.body.year;
      const text = req.body.text;
      const mainimage = req.body.mainimage;
      const subimage_1 = req.body.subimage_1;
      const subimage_2 = req.body.subimage_2;
      const subimage_3 = req.body.subimage_3;
      const subimage_4 = req.body.subimage_4;

      var tags
      
      if (typeof req.body.tags !== "undefined") {
        tags = req.body.tags.split(",");
      }

      

  Sneaker.findByIdAndUpdate({_id: req.params.id},
    {
      $set: {
        model,
        colorway,
        year,
        text,
        mainimage,
        subimage_1,
        subimage_2,
        subimage_3,
        subimage_4,
        tags
      }
    },
    { new: true }
  )
  .then(sneaker => {
      //check sneaker owner
      if(sneaker.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: 'User not authorizated'})
      }

      sneaker.save().then(sneaker => res.json(sneaker))
  })
  .catch(err => res.status(404).json({ sneakernotfound: 'No sneaker found'}))
})

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
      Sneaker.findById(req.params.id)
        .then(sneaker => {
          if (sneaker.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          sneaker.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ sneakernotfound: "No sneaker found" }));
    });
  }
);

// @route   SNEAKER api/sneakers/like/:id
// @desc    Like sneaker
// @access  Private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Sneaker.findById(req.params.id)
        .populate('user', ['name', 'avatar'])
        .then(sneaker => {
          if (
            sneaker.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "You already liked this sneaker" });
          }

          // Add user id to likes array
          sneaker.likes.unshift({ 
            user: req.user.id
           });
          sneaker.save().then(sneaker => res.json(sneaker));
        })
        .catch(err => res.status(404).json({ sneakernotfound: "No sneaker found" }));
    });
  }
);


// @route   Sneaker api/sneakers/unlike/:id
// @desc    UNLike sneaker
// @access  Private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Sneaker.findById(req.params.id)
        .populate('user', ['name', 'avatar'])
        .then(sneaker => {
          if (
            sneaker.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this sneaker" });
          }

          // Get remove index
          const removeIndex = sneaker.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          sneaker.likes.splice(removeIndex, 1);

          // Save
          sneaker.save().then(sneaker => res.json(sneaker));
        })
        .catch(err => res.status(404).json({ sneakernotfound: "No sneaker found" }));
    });
  }
);

// @route   SNEAKER api/sneakers/comment/:id
// @desc    Add comment to sneaker
// @access  Private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

  

    Sneaker.findById(req.params.id)
      .populate('user', ['name', 'avatar'])
      .then(sneaker => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
          handle: req.body.handle
        };

        // Add to comments array
        sneaker.comments.unshift(newComment);

        // Save
        sneaker.save().then(sneaker => res.json(sneaker));
      })
      .catch(err => res.status(404).json({ sneakernotfound: "No sneaker found" }));
  }
);

// @route   DELETE api/sneakers/comment/:id/:comment_id
// @desc    Remove comment from sneaker
// @access  Private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Sneaker.findById(req.params.id)
      .populate('user', ['name', 'avatar'])
      .then(sneaker => {
        // Check to see if comment exists

        if (
          sneaker.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = sneaker.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        sneaker.comments.splice(removeIndex, 1);

        sneaker.save().then(sneaker => res.json(sneaker));

      })
      .catch(err => res.status(404).json({ sneakernotfound: "No sneaker found" }));
  }
);


module.exports = router;