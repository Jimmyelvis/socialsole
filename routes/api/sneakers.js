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

// Set The Storage Engine
const storage = multer.diskStorage({
  // destination: './public/uploads/sneakers',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


// Init Upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100000000
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

// Check File Type
function checkFileType(file, cb) {

  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;

  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }

}

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dwgjvssdt',
  api_key: '934974923534473',
  api_secret: '8e_BIcnVqeaqw_llNYe_uKHIkiw'
});





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


// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
  Sneaker.findById(req.params.id)
  .populate('user', ['name', 'avatar'])
  .then(sneakers => res.json(sneakers))
  .catch(err =>
      res.status(404).json({ nopostsfound: "No sneaker found with that ID" })
    );
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
// @desc    Create post
// @access  Private

// router.post(
//   "/",
//   passport.authenticate("jwt", {
//     session: false
//   }),
//   upload.fields([{
//       name: 'mainimage',
//       maxCount: 1
//     },
//     {
//       name: 'subimage_1',
//       maxCount: 1
//     },
//     {
//       name: 'subimage_2',
//       maxCount: 1
//     },
//     {
//       name: 'subimage_3',
//       maxCount: 1
//     },
//     {
//       name: 'subimage_4',
//       maxCount: 1
//     },
//   ]),
//   async (req, res) => {

//     /* Receive a request of file paths as array from the above input fields */
//     let filePaths = new Array();

//     filePaths.push(req.files.mainimage[0].path)
//     filePaths.push(req.files.subimage_1[0].path)
//     filePaths.push(req.files.subimage_2[0].path)
//     filePaths.push(req.files.subimage_3[0].path)
//     filePaths.push(req.files.subimage_4[0].path)




//     let mutliupload = new Promise(async (resolve, reject) => {

//         // Keep track of the of the filepaths array
//         let upload_len = filePaths.length;

//         /*
//         Initialize variables for cloudinary filepaths, these will also be used to add
//         to the database later
//         */
//         let mainimage;
//         let subimage_1;
//         let subimage_2;
//         let subimage_3;
//         let subimage_4;


//         /*
//       Create a new array to hold all the responses from cloudinary, and with each  iteration through the for loop below compare with the upload_len variable. When they are both equal, we will now 
//       that we finished trying to process all the uploads.
//       */

//         upload_res = new Array();

//         for (let i = 0; i <= upload_len + 1; i++) {

//           //each file path being brought in
//           let filePath = filePaths[i];



//           await cloudinary.v2.uploader.upload(filePath, (error, result) => {

//             if (upload_res.length === upload_len) {
//               /* resolve promise after upload is complete */
//               resolve(
//                 [mainimage, subimage_1, subimage_2, subimage_3, subimage_4]

//               )

//             } else if (result) {

//               if (i === 0) {
//                 mainimage = result.url;
//               } 
//               else if (i === 1) {
//                 subimage_1 = result.url;
//               } 
//               else if (i === 2) {
//                 subimage_2 = result.url;
//               } 
//               else if (i === 3) {
//                 subimage_3 = result.url;
//               } 
//               else if (i === 4) {
//                 subimage_4 = result.url;
//               }

//               /*push path in an array for comparison later*/
//               upload_res.push(result.path);

//             } else if (error) {
//               console.log(error)
//               reject(error)
//             }

//           });


//         }



//       })
//       .then((result) => {

//         console.log('==============Results==============');
//         console.log(result);
//         console.log('====================================');

//         const newSneaker = new Sneaker({
//           model: req.body.model,
//           colorway: req.body.colorway,
//           year: req.body.year,
//           text: req.body.text,
//           mainimage: result[0],
//           subimage_1: result[1],
//           subimage_2: result[2],
//           subimage_3: result[3],
//           subimage_4: result[4],
//           user: req.user.id

//         });

//         newSneaker.save().then(sneaker => res.json(sneaker));

//       })
//       .catch((error) => {
//         console.log('the error is ' + error);

//       })

//   }
// );


// @route   SNEAKER api/sneakers
// @desc    Create sneaker version 2
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  upload.fields([{
      name: 'mainimage',
      maxCount: 1
    },
    {
      name: 'subimage_1',
      maxCount: 1
    },
    {
      name: 'subimage_2',
      maxCount: 1
    },
    {
      name: 'subimage_3',
      maxCount: 1
    },
    {
      name: 'subimage_4',
      maxCount: 1
    },
  ]),
  (req, res) => {

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
      user: req.user.id

    });

    newSneaker.save().then(sneaker => res.json(sneaker));

  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
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
      .then(sneaker => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
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