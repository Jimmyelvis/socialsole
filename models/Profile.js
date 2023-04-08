const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const listSchema = require('./schemas/List');

const ProfileSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  favsneaker: {
    type: String
  },
  bio: {
    type: String
  },
  location: {
    type: String
  },
  profilephoto: {
    type: String
  },
  avatar: {
    type: String
  },
  friends: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      handle: {
        type: String,
        required: true,
        max: 40
      },
      dateAdded: {
        type: Date,
        default: Date.now
      }
    },
    
  ],
  friendRequests: [

  ],
  lists: [listSchema],
  mycollection: [
    {
      brand: {
        type: String
      },
      model: {
        type: String
      },
      colorway: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  featured: {
    type: Number,
  },
});

// module.exports = Profile = mongoose.model('profile', ProfileSchema);
module.exports =  mongoose.model('profile', ProfileSchema);
