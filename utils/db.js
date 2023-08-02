const mongoose = require ('mongoose');
// DB Config
const db = require('../config/keys').mongoURI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });


    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);

  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};


module.exports = connectDB;
