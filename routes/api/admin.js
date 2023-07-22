const express = require('express')
const router = express.Router()

const Profile = require("../../models/Profile");
const Post = require("../../models/Post");
const Sneaker = require("../../models/Sneaker");
const Article = require("../../models/Article");



router.get('/test', (req, res) => {
    
  res.json({msg: "Yeah man"})
  
})

router.post('/getfeatured', (req, res) => {
  
  let type;

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



  type.find({ featured: { $gt: 0 } })
  .sort({ featured: 1 })
  .populate('user', ['name', 'avatar'])
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    res.json(err);
  })
})

router.post('/getnotfeatured', (req, res) => {
  
  let type;

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



  type.find({ featured: { $lt: 1 } })
  .populate('user', ['name', 'avatar'])
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    res.json(err);
  })
})


/**
 * @route api/blogs/edit-topnews/
 * @access Private
 * 
 * This the api route for editing the top news section on the front
 * end. We need to take in three parameters on the req.body:
 * -- prevPostId this is the id of the post that will be replaced
 * -- nextPostId this is the id of the post that we are inserting in
 *    the top news section
 * -- nextPostPosNumber this the position number that the newly inserted
 *    post will be placed in.
 * 
 * We first need to find the id of the post that we are taking out of the top
 * news section, using const prevPost, if we don't have any problems finding
 * then we set its (featuredTopstory) value to 0 which will take it out of that
 * section. We repeat the finding step but now with the id of the new post
 * that we're inserting into that section const nextPost.
 * 
 * We then set its (featuredTopstory) value to the req.body.nextPostPosNumber value
 * that we get from the req object. If everything is successful we will respond with
 * the new post.
 */
router.post ('/editfeatureditems' , (req, res) => {

  const prevPost = req.body.prevPostId;
  const nextPost = req.body.nextPostId;
  const nextPostPosNumber= req.body.nextPostPosNumber;

  let type;


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

  
  type.findById(prevPost, (error, prevPostresult) => {

    let prevTitle;
    let nextTitle;

    if (error) {
      res.json({
        error: error,
      });
      console.log(error);
    } 

    else if (nextPost === "" || undefined || null) {
        res.json({ msg: "nextPostId is missing" });
    } 
    
    else {

      switch (type) {
        case Post:
          prevTitle = prevPostresult.headline;
          break;
        case Sneaker:
          prevTitle = `${prevPostresult.model} ${prevPostresult.colorway} ${prevPostresult.year}`;
          break;
        case Article:
          prevTitle = prevPostresult.headline;
          break;
        case Profile:
          prevTitle = prevPostresult.name;
          break;
        default:
          prevTitle = prevPostresult.headline;
          break;
      }


      prevPostresult.featured = 0;
      console.log(prevPostresult);

      prevPostresult.save((error, updatedRecord) => {
        console.log("success");
      });

      type.findById(nextPost, (error, nextPostresult) => {

        if (error) {
          res.json({
            error: error,
          });
          console.log(error);
        } 
        
        else {

          nextPostresult.featured = nextPostPosNumber;
          console.log(nextPostresult);

          nextPostresult.save((error, updatedRecord) => {

            switch (type) {
              case Post:
                nextTitle = updatedRecord.headline;
                break;
              case Sneaker:
                nextTitle = `${updatedRecord.model } ${updatedRecord.colorway} ${updatedRecord.year}`;
                break;
              case Article:
                nextTitle = updatedRecord.headline;
                break;
              case Profile:
                nextTitle = updatedRecord.name;
                break;
              default:
                nextTitle = updatedRecord.headline;
                break;
            }

            res.json({
              msg: `Successfully Replaced with ${nextTitle} and removed ${prevTitle}`,
            });
            console.log("success");

          });
        }
      });
    }
  });

   
});




module.exports = router;