const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Load Validation
const validateProfileInput = require('../../validation/profile');



// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({
  msg: "Profile Works"
}));



// @route   GET api/profile
// @desc    Get current users profile
// @access  Private

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {};

    Profile.findOne({
        user: req.user.id
      })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};


  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({
      profile: 'There are no profiles'
    }));

});

// @route   GET api/profile/newestmembers/
// @desc    Get the four new members who created a profile
// @access  Public

router.get("/newestmembers", (req, res) => {

  Profile.find()
  .populate('user', ['name', 'avatar'])
  .sort({ date: -1 })
  .then(profiles => profiles.slice(0,4))
  .then(profiles => res.json(profiles))
  .catch(err => res.status(404).json({
    profile: 'There are no profiles'
  }));

 
})


// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({
      handle: req.params.handle
    })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});


// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({
      user: req.params.user_id
    })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json({
      profile: 'There is no profile for this user'
    }))
});



// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

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


    Profile.findOne({ user: req.user.id }).then(profile => {

      /* 
        Look for a profile  for the current user in the 
        req.body { user: req.user.id }. If one is found 
        update that profile with the req.body info from above
      */
      if (profile) {

        // Update Profile
        Profile.findOne(
          { handle: profileFields.handle }
        ).then(profileByHandle => {
          
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
						if ( profileByHandle && (profileByHandle.id !== profile.id)) {
							errors.handle = "That handle already exists.";
							return res.status(400).json(errors);
            }
            
            /* 
              Update profile. $set: profileFields, simply sets the 
              profile fields in the req.body above, to the matching
              fields in the collection. 
            */
						Profile.findOneAndUpdate(
							{ user: req.user.id },
							{ $set: profileFields },
							{ new: true }
						).then(profile => res.json(profile))
        });
      } 
      else {

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
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          /*
            Create then Save Profile, then send back the profile in 
            JSON format back to the front end.
          */
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);



// / @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    Profile.findOneAndRemove({
      user: req.user.id
    }).then(() => {
      User.findOneAndRemove({
        _id: req.user.id
      }).then(() =>
        res.json({
          success: true
        })
      );
    });
  }
);

module.exports = router;