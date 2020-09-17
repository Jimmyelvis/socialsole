const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Schema
const ArticleSchema = new Schema({
  
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  author: {
    type: String,
    // required: true  
  },
  text: {
    type: String,
    // required: true
  },
  headline: {
    type: String
  },
  avatar: {
    type: String
  },
  address:{
    type: String
  },
  fullheaderimage: {
    type: String
  },
  articleheaderimage: {
    type: String
  },
  email: {
    type: String
  },
  youtube: {
    type: String
  },
  facebook: {
    type: String
  },
  twitter: {
    type: String
  },
  instagram: {
    type: String
  },
  tags: {
    type: [String],
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      avatar: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      name: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments:[
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      },
      msg: {
        type: String
      },
      handle:{
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('article', ArticleSchema);
