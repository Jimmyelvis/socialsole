const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// Load Validation
const validateProfileInput = require("../../validation/profile");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");
// Post model
const Post = require("../../models/Post");

const Sneaker = require("../../models/Sneaker");

const Article = require("../../models/Article");
const { json } = require("body-parser");
const { log } = require("console");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Profile Works",
  })
);

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    const errors = {};

    Profile.findOne({
      user: req.user.id,
    })
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch((err) =>
      res.status(404).json({
        profile: "There are no profiles",
      })
    );
});

// @route   GET api/profile/newestmembers/
// @desc    Get the four new members who created a profile
// @access  Public

router.get("/newestmembers", (req, res) => {
  Profile.find()
    .populate("user", ["name", "avatar"])
    .sort({ date: -1 })
    .then((profiles) => profiles.slice(0, 4))
    .then((profiles) => res.json(profiles))
    .catch((err) =>
      res.status(404).json({
        profile: "There are no profiles",
      })
    );
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({
    handle: req.params.handle,
  })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({
    user: req.params.user_id,
  })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch((err) =>
      res.status(404).json({
        profile: "There is no profile for this user",
      })
    );
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private

router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.favsneaker) profileFields.favsneaker = req.body.favsneaker;
  if (req.body.profilephoto) profileFields.profilephoto = req.body.profilephoto;
  if (req.body.avatar) profileFields.avatar = req.body.avatar;

  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  if (req.body.profilephoto) profileFields.profilephoto = req.body.profilephoto;

  Profile.findOne({ user: req.user.id }).then((profile) => {
    /* 
        Look for a profile  for the current user in the 
        req.body { user: req.user.id }. If one is found 
        update that profile with the req.body info from above
      */
    if (profile) {
      // Update Profile
      Profile.findOne({ handle: profileFields.handle }).then((profileByHandle) => {
        /* 
            Using the { handle: profileFields.handle } check to see 
            if there's a handle in the collection that matches the
            handle from the req.body. If there is a match THEN check
            and make sure that the handle.id in the collection,
            matches the handle.id from the req.body. If there's a
            match good, if NOT then that mean the user is trying
            to change their handle to one that's is already taken by
            someone else, so we must throw an error, and return.
            
            If handle is a duplicate then send error
          */
        if (profileByHandle && profileByHandle.id !== profile.id) {
          errors.handle = "That handle already exists.";
          return res.status(400).json(errors);
        }

        /* 
              Update profile. $set: profileFields, simply sets the 
              profile fields in the req.body above, to the matching
              fields in the collection. 
            */
        Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).then((profile) => res.json(profile));
      });
    } else {
      /* 
            If however a profile is NOT found for that particular user 
            in the req.body THEN that means that we have to create one
            which is done below

            Create Profile
          */

      /* 
          Since we're creating NOT updating the profile we need to
          make sure that an existing handle in the collection doesn't 
          match the one that's coming in from the req.body aka 
          no duplicate handles.

          -- Check if handle already exists.
        */
      Profile.findOne({ handle: profileFields.handle }).then((profile) => {
        if (profile) {
          errors.handle = "That handle already exists";
          res.status(400).json(errors);
        }

        /*
            Create then Save Profile, then send back the profile in 
            JSON format back to the front end.
          */
        new Profile(profileFields).save().then((profile) => res.json(profile));
      });
    }
  });
});

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.post("/timeline", (req, res) => {
  /* respond with the req.body */
  // res.json(req.body);

  /**
   * loop through an array of objects and push the "user" key
   * to a new array called "users"
   */
  let users = [];

  req.body.forEach((person) => {
    users.push(person.user);
  });



  /*
    Loop through the users array and find all posts with matching user _id, add a new key to the post object called "type" and set it to "post", then Loop through the users array and find all sneakers, with matching user _id, add a new key to the sneaker object called "type" and set it to "sneaker", combine both results into new array, sort desc order by date
*/

  Post.find({ user: { $in: users } })
    .lean()
    .populate("user", ["name", "avatar"])
    .sort({ date: -1 })
    .then((posts) => {
      posts.forEach((post) => {
        post.type = "post";
      });
      Sneaker.find({ user: { $in: users } })
        .lean()
        .populate("user", ["name", "avatar"])
        .sort({ date: -1 })
        .then((sneakers) => {
          sneakers.forEach((sneaker) => {
            sneaker.type = "sneaker";
          });
          let timeline = posts.concat(sneakers).sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
          res.json(timeline);
        });
    });
});

// router.post(
//   "/yourcomments",
//   passport.authenticate("jwt", {
//     session: false,
//   }),
//   (req, res) => {
//     /*
//       Look through the Post model and find all posts that have a comment with a user id that matches the current user id, filter out the comments that don't match the current user id, place the comments in a new array, with all the info from the post, then look through the Sneakers model and find all sneakers that have a comment with a user id that matches the current user id, filter out the comments that don't match the current user id, place the comments in a new array, with all the info from the sneaker, then populate the user key with the name and avatar, combine both results into new array, sort desc order by date
//     */

//     let comments = [];

//     Post.find({ comments: { $elemMatch: { user: req.user.id } } })
//       .lean()
//       .populate("user", ["name", "avatar"])
//       .sort({ date: -1 })
//       .then((posts) => {
//         posts.forEach((post) => {
//           post.type = "post";
//           post.comments = post.comments.filter((comment) => {
//             return comment.user.toString() === req.user.id;
//           });

//           post.comments.forEach((comment) => {
//             let newComment = {};

//             newComment = {
//               ...comment,
//               "post-id": post._id,
//               headline: post.headline,
//               headerimage: post.headerimage,
//               postdate: post.date,
//               author: {
//                 name: post.user.name,
//                 avatar: post.user.avatar,
//               },
//               type: post.type,
//             };

//             comments.push(newComment);
//           });
//         });

//         Sneaker.find({ comments: { $elemMatch: { user: req.user.id } } })
//           .lean()
//           .populate("user", ["name", "avatar"])
//           .sort({ date: -1 })
//           .then((sneakers) => {
//             sneakers.forEach((sneaker) => {
//               sneaker.type = "sneaker";
//               sneaker.comments = sneaker.comments.filter((comment) => {
//                 return comment.user.toString() === req.user.id;
//               });

//               sneaker.comments.forEach((comment) => {
//                 let newComment = {};

//                 newComment = {
//                   ...comment,
//                   "sneaker-id": sneaker._id,
//                   model: sneaker.model,
//                   colorway: sneaker.colorway,
//                   mainimage: sneaker.mainimage,
//                   author: {
//                     name: sneaker.user.name,
//                     avatar: sneaker.user.avatar,
//                   },
//                   sneakerdate: sneaker.date,
//                   type: sneaker.type,
//                 };

//                 comments.push(newComment);
//               });

//               comments.sort((a, b) => {
//                 return new Date(b.date) - new Date(a.date);
//               });
//             });

//             res.json(comments);
//           });
//       });
//   }
// );


router.post(
  "/yourcomments",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    /*
      Look through the Post model and find all posts that have a comment with a user id that matches the current user id, filter out the comments that don't match the current user id, place the comments in a new array, with all the info from the post, then look through the Sneakers model and find all sneakers that have a comment with a user id that matches the current user id, filter out the comments that don't match the current user id, place the comments in a new array, with all the info from the sneaker, then populate the user key with the name and avatar, combine both results into new array, sort desc order by date
    */

    let comments = [];

    Post.find({ comments: { $elemMatch: { user: req.user.id } } })
      .lean()
      .populate("user", ["name", "avatar"])
      .sort({ date: -1 })
      .then((posts) => {
        posts.forEach((post) => {
          post.type = "post";
          post.comments = post.comments.filter((comment) => {
            return comment.user.toString() === req.user.id;
          });

          post.comments.forEach((comment) => {
            let newComment = {};

            newComment = {
              ...comment,
              "post-id": post._id,
              headline: post.headline,
              headerimage: post.headerimage,
              postdate: post.date,
              author: {
                name: post.user.name,
                avatar: post.user.avatar,
              },
              type: post.type,
            };

            comments.push(newComment);
          });
        });

        Sneaker.find({ comments: { $elemMatch: { user: req.user.id } } })
          .lean()
          .populate("user", ["name", "avatar"])
          .sort({ date: -1 })
          .then((sneakers) => {
            sneakers.forEach((sneaker) => {
              sneaker.type = "sneaker";
              sneaker.comments = sneaker.comments.filter((comment) => {
                return comment.user.toString() === req.user.id;
              });

              sneaker.comments.forEach((comment) => {
                let newComment = {};

                newComment = {
                  ...comment,
                  "sneaker-id": sneaker._id,
                  model: sneaker.model,
                  colorway: sneaker.colorway,
                  mainimage: sneaker.mainimage,
                  author: {
                    name: sneaker.user.name,
                    avatar: sneaker.user.avatar,
                  },
                  sneakerdate: sneaker.date,
                  type: sneaker.type,
                };

                comments.push(newComment);
              });

            });

            Article.find({ comments: { $elemMatch: { user: req.user.id } } })
              .lean()
              .populate("user", ["name", "avatar"])
              .sort({ date: -1 })
              .then((articles) => {
                articles.forEach((article) => {
                  article.type = "article";
                  article.comments = article.comments.filter((comment) => {
                    return comment.user.toString() === req.user.id;
                  });

                  article.comments.forEach((comment) => {
                    let newComment = {};

                    newComment = {
                      ...comment,
                      "article-id": article._id,
                      headline: article.headline,
                      fullheaderimage: article.fullheaderimage,
                      articledate: article.date,
                      author: {
                        name: article.user.name,
                        avatar: article.user.avatar,
                      },
                      type: article.type,
                    };

                    comments.push(newComment);
                  });
                });
                
            
            comments.sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
            });

            res.json(comments);
          });
      });
  }
)});


router.get(
  "/youliked",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    /*
      Look through the Post model and find all posts that have a like with a user id that matches the current user id, filter out the likes that don't match the current user id, place the likes in a new array, with all the info from the post, then look through the Sneakers model and find all sneakers that have a like with a user id that matches the current user id, filter out the likes that don't match the current user id, place the likes in a new array, with all the info from the sneaker, then populate the user key with the name and avatar, combine both results into new array, sort desc order by date
    */

    Post.find({ likes: { $elemMatch: { user: req.user.id } } })
      .lean()
      .populate("user", ["name", "avatar"])
      .sort({ date: -1 })
      .select("-comments -likes")
      .select("-likes")
      .then((posts) => {
        posts.forEach((post) => {
          post.type = "post";
        });

        Sneaker.find({ likes: { $elemMatch: { user: req.user.id } } })
          .lean()
          .populate("user", ["name", "avatar"])
          .sort({ date: -1 })
          .select("-comments -likes")
          .then((sneakers) => {
            sneakers.forEach((sneaker) => {
              sneaker.type = "sneaker";
            });

            let likes = [...posts, ...sneakers].sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
            });

            res.json(likes);
          });
      });
  }
);


router.post(
  "/addfriend",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {

    Profile.findOne({
      user: req.user._id,
    }).then((profile) => {

        const origProfile = profile;

        /**
         * Find the profile you want to add as a friend by its
         * profile _id
         */
        Profile.findOne({
          _id: req.body._id,
        })
        .populate("user", ["name", "avatar"])
        .then((profile) => {

          let addedProfile = profile;


          origProfile.friends.unshift(addedProfile);

          /**
           * Remove added profile from friend requests array
           */

          origProfile.friendRequests = origProfile.friendRequests.filter(
            (friendrequest) => {
              return friendrequest._id.toString() !== addedProfile._id.toString();
            }
          );
          


          origProfile.save().then((profile) =>{ 
            
            addedProfile.friends.unshift(origProfile);


              addedProfile.save().then((profile) => {



                res.json({
                  msg: `You are now friends with ${addedProfile.user.name}`,
                });
              })
          });

        })



    });
    
    
  });

router.post(
  "/addfriendrequest",
  passport.authenticate("jwt", {
    session: false,}),
  (req, res) => {

    const friendReqProfile = req.body.reqProfile_id;
    const myProfile = req.body.yourProfile_id;

    Profile.findOne({
      _id: myProfile,
    })
    .lean()
    .populate("user", ["name", "avatar"])
    .then((profile) => {

      let myProfile = profile;

      Profile.findOne({
        _id: friendReqProfile,
      }).then((profile) => {

        let friendReqProfile = profile;

        let myProfileObj = {
          _id: myProfile._id,
          name: myProfile.user.name,
          avatar: myProfile.user.avatar,
          handle: myProfile.handle,
        }


        friendReqProfile.friendRequests.unshift(myProfileObj);


        friendReqProfile.save().then((profile) => res.json(profile));

      })

  })

});

router.post("/removefriend", passport.authenticate("jwt", 
{session: false,}), (req, res) => {

  const friendProfile = req.body.friendProfile_id;

  Profile.findOne({
    user: req.user._id,
  }).then((profile) => {

    let myProfile = profile;

    myProfile.friends = myProfile.friends.filter((friend) => {
      return friend._id.toString() !== friendProfile.toString();
    })

    myProfile.save().then((profile) => {

      Profile.findOne({
        _id: friendProfile,
      })
      .populate("user", ["name", "avatar"] )
      .then((profile) => {
  
        let friendProfile = profile;
  
        friendProfile.friends = friendProfile.friends.filter((friend) => {
          return friend._id.toString() !== myProfile._id.toString();
        })
  
        friendProfile.save().then((profile) => res.json({
          msg: `You have removed ${friendProfile.user.name} as a friend`
        }));
  
      })

    });


  })
})  


router.post("/denyfriendrequest", passport.authenticate("jwt", {session: false,}), (req, res) => {

  const friendReqProfile = req.body.reqProfile_id;
  const myProfile = req.body.yourProfile_id;

  Profile.findOne({
    _id: myProfile,
  })
  .populate("user", ["name", "avatar"])
  .then((profile) => {

    let myProfile = profile;

    myProfile.friendRequests = myProfile.friendRequests.filter((friendrequest) => {
      return friendrequest._id.toString() !== friendReqProfile.toString();
    })

    myProfile.save().then((profile) => res.json({
      msg: `You have denied the friend request`
    }));

  })

});



router.post(
  "/getfriends",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {

    Profile.findOne({
      user: req.user._id,
    }).then((profile) => {

      let friends = profile.friends;

      Profile.find({
        _id: friends,
      })
      .populate("user", ["name", "avatar"])
      .select("-friendRequests -mycollection")
      .then((friends) => {
        res.json(friends);
      })

    });
    
    
  });


router.post(
  "/getfriendReqs",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {

    Profile.findOne({
      user: req.user._id,
    }).then((profile) => {

      let friendReq = profile.friendRequests;

      Profile.find({
        _id: friendReq,
      })
      .populate("user", ["name", "avatar"])
      .select("-friendRequests -mycollection")
      .then((friendReqs) => {
        res.json(friendReqs);
      })

    });
    
    
  });


router.post('/createlist', (req, res) => {
  const { profileId, name } = req.body;

  Profile.findById(profileId)
    .then((profile) => {
      if (!profile) {
        return res.status(404).json({ success: false, message: 'Profile not found.' });
      }

      const newList = {
        name,
        items: [],
      };

      profile.lists.push(newList);

      return profile.save();
    })
    .then((profile) => {
      res.status(201).json({ 
        success: true, 
        message: 'List created successfully.' ,
        profile: profile
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, message: 'Unable to create list.' });
    });
});

router.patch('/editlist/:listId', (req, res) => {
  const { listId } = req.params;
  const { name } = req.body;

  Profile.findOne({ 'lists._id': listId })
    .then((profile) => {
      if (!profile) {
        return res.status(404).json({ success: false, message: 'List not found.' });
      }

      const list = profile.lists.id(listId);

      if (!list) {
        return res.status(404).json({ success: false, message: 'List not found.' });
      }

      list.name = name;

      return profile.save();
    })
    .then(() => {
      res.status(200).json({ success: true, message: 'List name updated successfully.' });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: 'Unable to update list name.' });
    });
});

router.delete('/deletelist/:listId', (req, res) => {
  const { listId } = req.params;

  Profile.findOne({ 'lists._id': listId })
    .then((profile) => {
      if (!profile) {
        return res.status(404).json({ success: false, message: 'List not found.' });
      }

      const list = profile.lists.id(listId);

      if (!list) {
        return res.status(404).json({ success: false, message: 'List not found.' });
      }

      list.remove();

      return profile.save();
    })
    .then(() => {
      res.status(200).json({ success: true, message: 'List deleted successfully.' });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: 'Unable to delete list.' });
    });
});

// router.post('/addtolist', (req, res) => {
//   const { profileId, listId, itemType, itemId } = req.body;

//   Profile.findById(profileId)
//     .then((profile) => {
//       if (!profile) {
//         return res.status(404).json({ success: false, message: 'Profile not found.' });
//       }

//       const list = profile.lists.id(listId);
//       if (!list) {
//         return res.status(404).json({ success: false, message: 'List not found.' });
//       }

//       const newItem = {
//         itemType,
//         itemId,
//       };
//       list.items.push(newItem);
//       return profile.save();
//     })
//     .then(() => {
//       res.status(200).json({ success: true, message: 'Item added to list.' });
//     })
//     .catch((err) => {
//       console.log("err", err);
//       res.status(500).json({ success: false, message: 'Unable to add item to list.' });
//     });
// });

router.post('/addtolist', (req, res) => {
  
  const { listId, itemType, itemId } = req.body;

  Profile.findOne({ 'lists._id': listId })
    .then(profile => {
      if (!profile) {
        throw new Error('List not found.');
      }

      // find the list using listId
      const list = profile.lists.find(list => {
        return list._id.toString() === listId;
      });

      // check if item already exists in the list
      const itemIndex = list.items.findIndex(item => {
        return item.itemType === itemType && item.itemId === itemId;
      });

      if (itemIndex !== -1) {
        // update item's modified field to current date
        list.items[itemIndex].modified = new Date();
        // save the updated profile
        return profile.save()
          .then(() => {
            res.json({ message: 'Item already exists in the list and has been updated.' });
          })
          .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
          });
      }

      // item does not exist, create a new one
      list.items.push({
        itemType,
        itemId,
        added: new Date(),
        modified: new Date()
      });

      // save the updated profile
      return profile.save()
        .then(() => {
          res.json({ message: 'Item added to the list.' });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

/** 
  @route  GET api/profile/lists/items
  @desc   Get list items

  We use this route to get the items associated with a user's created list.
*/
router.post('/lists/items', (req, res) => {
  const { listId } = req.body;

  console.log('=================listId===================');
  console.log(listId);
  console.log('====================================');

  let listItems = [];

  Profile.findOne({ 'lists._id': listId })

    .then(profile => {

      if (!profile) {
        throw new Error('List not found.');
      }


      // find the list using listId
      const list = profile.lists.find(list => {

        return list._id.toString() === listId

      });


      let Model;

      /** 
        Seeing that we are making multiple queries to the database, 
        which are async we are going to create an array of promises
        The list.items.map function iterates through each element in the list.items array and applies a callback function to each element. This callback function creates a promise for each element in the array by using the Model.findById function to find the item associated with that element.

        The switch statement is used to determine which Model to use based on the itemType property of each element. For example, if elem.itemType is 'post', then the Model variable is set to the Post model.
      */
      const promises = list.items.map(elem => {
        switch (elem.itemType) {
          case 'post':
            Model = Post;
            break;
          case 'sneaker':
            Model = Sneaker;
            break;
          case 'article':
            Model = Article;
            break;
          default:
            throw new Error('Invalid item type.');
        }

        return Model.findById(elem.itemId)
          .lean()
          .populate("user", ["name", "avatar"])
          .then(item => {
            return {
              ...item,
              itemType: elem.itemType,
              itemId: elem.itemId,
              added: elem.added,
              modified: elem.modified,   
            }
          });
      });

      /**
       * Each Model.findById call returns a promise that resolves with the item associated with that element. These promises are then collected in an array called promises.

        the Promise.all(promises) function is called to wait for all of the promises in the promises array to resolve. Once all the promises are resolved, the items array is returned. The items array contains the items associated with each element in the list.items array.
       */

      Promise.all(promises)
        .then(items => {
          listItems = items;
          res.json(listItems);
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'Internal server error', err: err });
        });

     })
     .catch(err => {
       console.error(err);
      res.status(500).json({ message: 'Internal server error', err: err });
    });
});


router.delete('/lists/deleteitem', (req, res) => {
  const { listId, itemId } = req.body;

  Profile.findOne({ 'lists._id': listId })
    .then(profile => {
      if (!profile) {
        throw new Error('List not found.');
      }

      const list = profile.lists.find(list => list._id.toString() === listId);

      const itemIndex = list.items.findIndex(item => item.itemId === itemId);

      if (itemIndex === -1) {
        throw new Error('Item not found.');
      }

      list.items.splice(itemIndex, 1);

      profile.save()
        .then(() => res.json({ message: 'Item successfully deleted.' }))
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'Internal server error.' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error.' });
    });
});

router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    Profile.findOneAndRemove({
      user: req.user.id,
    }).then(() => {
      User.findOneAndRemove({
        _id: req.user.id,
      }).then(() =>
        res.json({
          success: true,
        })
      );
    });
  }
);

module.exports = router;
