const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.author = !isEmpty(data.author) ? data.author : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.headline = !isEmpty(data.headline) ? data.headline : '';



  if (!Validator.isLength(data.text, { min: 2})) {
    errors.text = 'Post must be at least 2 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  if (Validator.isEmpty(data.address)) {
    errors.text = 'Address field is required';
  }

  if (Validator.isEmpty(data.author)) {
    errors.text = 'Author field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.text = 'Email field is required';
  }

  if (Validator.isEmpty(data.headline)) {
    errors.text = 'Headline field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};