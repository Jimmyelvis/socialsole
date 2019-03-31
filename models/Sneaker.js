const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SneakerSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  model: {
    type: String
  },
  colorway: {
    type: String
  },
  year: {
    type: Number
  },
  text:{
    type: String
  },
  mainimage: {
    type: String
  },
  subimage_1:{
    type: String
  },
  subimage_2:{
    type: String
  },
  subimage_3:{
    type: String
  },
  subimage_4:{
    type: String
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
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('sneaker', SneakerSchema);
