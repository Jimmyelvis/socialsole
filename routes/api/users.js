const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
// const firebase = require ('firebase');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');



// Load user model
const User = require('../../models/User')

// Set The Storage Engine
const storage = multer.diskStorage({
  // destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


// Init Upload
const upload = multer({
  storage: storage,
  limits:{
    fileSize: 100000000
  },
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
});



// Check File Type
function checkFileType(file, cb){

  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;

   // Check ext
   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

   // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
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



// @route GET api/users/test
// @desc tests users route
// @acces public
router.get('/test', (req, res) => res.json({msg:"users works"}))



// @route GET api/users/register
// @desc Rgister route
// @acces public
router.post('/register', upload.single('image'), (req, res) => {


  const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

  User.findOne({email: req.body.email}).then(user => {
    if(user) {
      errors.email = 'Email already exists';
      return res.status(400).json({errors})
    } else {

    const newUser = new User({
      name:req.body.name,
      email: req.body.email,
      avatar: req.body.avatar,
      password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
      })
    })

    }
  })
})


// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email })
    
  .then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User Not Found'
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Matched

        // Create JWT Payload
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; 

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 259200 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }

        );
      }else{
        errors.password = 'password incorrect'
        return res.status(400).json(errors);
      }
    });

  });


});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private

router.get('/current', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar
    });
  }
)

module.exports = router;