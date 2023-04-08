const express = require('express')
const router = express.Router()

const Profile = require("../../models/Profile");
const Post = require("../../models/Post");
const Sneaker = require("../../models/Sneaker");
const Article = require("../../models/Article");


// @route   GET api/search/
// @desc    Get all content
// @access  Public

router.get('/query/:query', (req, res) => {

    /**
   *  { searcher } = req.query Whatever you name this
   *  will be equal to whatever you are searching for
   * ie. http://localhost:8000/api/blogs/search?searcher=Hockey
   */
    const { search } = req.query;

    console.log('====================================');
    console.log("req.query",req.query);
    console.log('====================================');



    if (search) {
        // Search for the search term in the title, body, and tags

        // Find all blogs that match the search term
        Post.find(
          { $or: [
              { headline: { $regex: search, $options: "i" } }, 
              { tags: { $regex: search, $options: "i" } }
            ] 
          }, 
            (err, posts) => {
            if (err) {
                console.log(err);
            } else {
                Sneaker.find(
                  { $or: [
                    { model: { $regex: search, $options: "i" } }, 
                    { colorway: { $regex: search, $options: "i" } }, 
                    { tags: { $regex: search, $options: "i" } }
                    ] }, 
                    (err, sneakers) => {
                    if (err) {
                        console.log(err);
                    } else {
                        Article.find({ 
                          $or: [
                            { headline: { $regex: search, $options: "i" } }, 
                            { body: { $regex: search, $options: "i" } }, 
                            { tags: { $regex: search, $options: "i" } }
                          ] }, 
                            (err, articles) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.json({ 
                                  posts: {
                                    posts,
                                    count: posts.length
                                  },
                                  sneakers: {
                                    sneakers,
                                    count: sneakers.length
                                  }, 
                                  articles: {
                                    articles,
                                    count: articles.length
                                  }
                                });
                            }
                        })
                    }
                })
            }
        })
    } else {
        res.json({ posts: [], sneakers: [], articles: [] });

    }

})

module.exports = router;
