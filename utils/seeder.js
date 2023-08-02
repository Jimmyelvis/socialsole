const mongoose = require ("mongoose");
const dotenv = require ("dotenv");
const colors = require ("colors");
const users = require ("../sample_data/data/users.js");
const articles = require("../sample_data/data/articles.js");
const posts = require("../sample_data/data/posts.js");
const sneakers = require("../sample_data/data/sneakers.js");
const profiles = require("../sample_data/data/profiles.js");

const User = require ("../models/User.js");
const Sneaker = require ("../models/Sneaker.js");
const Article = require ("../models/Article.js");
const Post = require ("../models/Post.js");
const Profile = require ("../models/Profile.js");

const connectDB = require ("./db.js");

dotenv.config();

connectDB();



const importData = async () => {
  try {
    await User.deleteMany();
    await Sneaker.deleteMany();
    await Article.deleteMany();
    await Post.deleteMany();
    await Profile.deleteMany();

    await User.insertMany(users);
    await Sneaker.insertMany(sneakers);
    await Article.insertMany(articles);
    await Post.insertMany(posts);
    await Profile.insertMany(profiles);


    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};


if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}