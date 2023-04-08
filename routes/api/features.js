const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");
// Post model
const Post = require("../../models/Post");

const Sneaker = require("../../models/Sneaker");

const Article = require("../../models/Article")


router.put("/editFeatured",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    let type;

    const prevItem = req.body.prevItemId;
    const nextItem = req.body.nextItemId;
    const nextItemPosNumber= req.body.nextItemPosNumber;


  switch (req.body.type) {
    case "Post":
      type = Post;
      break;
    case "Sneaker":
      type = Sneaker;
      break;
    case "Article":
      type = Article;
      break;
    case "Profile":
      type = Profile;
      break;
    default:
      type = Post;
      break;
  }


    type.findById(prevItem)
    .populate('user', ['name', 'avatar'])
    .sort({ date: -1 })
    .then(item => {

     if (!item) {
      res.status(404).json({ noitemsMatched: "No items found" })
      
     } else {

       if (!nextItem) {
         item.featured = nextItemPosNumber;
         item.save();
         res.json({
           "success": "Successfully updated featured items",
         })
       } 
       
       else if (nextItem) {
         
         item.featured = 0;
  
         type.findById(nextItem)
         .populate('user', ['name', 'avatar'])
         .sort({ date: -1 })
         .then(nextItem => {
           nextItem.featured = nextItemPosNumber;
           nextItem.save();
           item.save();
           res.json({
             "success": "Successfully updated featured items",
           })
         })
       }

     }

    })
    .catch(err => {

        console.log('====================================');
        console.log(err);
        console.log('====================================');

        res.status(404).json({
          err: "Something went wrong"
        })

      }

    );


    // res.json({type: type});

  });



module.exports = router;
