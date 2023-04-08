const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');


const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const sneakers = require('./routes/api/sneakers');
const articles = require('./routes/api/articles');
const search = require('./routes/api/search');
const features = require('./routes/api/features');





const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log('connected'))
  .catch(err => console.log(err));

  // Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Public Folder
app.use(express.static('./public'));

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/sneakers', sneakers);
app.use('/api/articles', articles);
app.use('/api/search', search);
app.use('/api/features', features);


// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

}

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Server running on port ${port}`));

