const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';
  data.author = !isEmpty(data.author) ? data.author : '';
  // data.email = !isEmpty(data.email) ? data.email : '';
  data.headline = !isEmpty(data.headline) ? data.headline : '';
  data.fullheaderimage = !isEmpty(data.fullheaderimage) ? data.fullheaderimage : '';
  data.articleheaderimage = !isEmpty(data.articleheaderimage) ? data.articleheaderimage : '';




  if (!Validator.isLength(data.text, { min: 2})) {
    errors.text = 'Article must be at least 2 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Article field is required';
  }

  // if (!Validator.isEmail(data.email)) {
  //   errors.email = 'Email is invalid';
  // }
 
  // if (Validator.isEmpty(data.email)) {
  //   errors.email = 'Email field is required';
  // }

  if (Validator.isEmpty(data.headline)) {
    errors.headline = 'Headline field is required';
  }

  if (Validator.isEmpty(data.fullheaderimage)) {
    errors.fullheaderimage = 'A Full Header Image is needed for submission';
  }

  if (Validator.isEmpty(data.articleheaderimage)) {
    errors.articleheaderimage = 'A Article Header Image is needed for submission';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};