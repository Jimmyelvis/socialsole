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

// Load Profile Model



// @route    GET api/users/auth
// @desc     Get user by token
// @access   Private

// router.get('/auth',  passport.authenticate('jwt', { session: false }), async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

router.get('/auth',  passport.authenticate('jwt', { session: false }),(req, res) => {
  User.findById(req.user.id).select('-password').
  then(user => res.json(user))
  .catch(err => res.status(500).json({ msg: 'Server Error' }));
});


// @route GET api/users/register
// @desc Rgister route
// @acces public
router.post('/register', (req, res) => {


  const { errors } = validateRegisterInput(req.body);

    // Check Validation
    if (errors.length > 0) {
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
        .then(user => {

          const payload = { id: user.id, name: user.name, avatar: user.avatar, role: user.role }; 

          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.json({ 
                token: 'Bearer ' + token 
              });
              
            }
          );
    

          // res.json(user)
        })
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
        const payload = { id: user.id, name: user.name, avatar: user.avatar, role: user.role }; 

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

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};


  User.find()
    .sort({ date: 1 })
    .then(users => {
      if (!users) {
        errors.noprofile = 'There are no users';
        return res.status(404).json(errors);
      }

      res.json(users);
    })
    .catch(err => res.status(404).json({
      users: 'There are no users'
    }));

});

router.post('/changeuser', (req, res) => {

  const userId = req.body._id;
  const role = req.body.role;

  User.findOneAndUpdate({_id: userId}, {role: role}, {new: true})
  .select('-password')
  .then(user => {
    res.json({
      user: user,
      msg: 'User Role changed to ' + user.role
    })
  })
  
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