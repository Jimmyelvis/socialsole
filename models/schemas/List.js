const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [
    {
      itemType: {
        type: String,
        required: true,
      },
      itemId: {
        type: String,
        required: true,
      },
      added: {
        type: Date,
        default: Date.now,
      },
      modified: {
        type: Date,
        default: Date.now,  
      },
    }
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = listSchema;
