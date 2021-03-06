const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';
  // data.address = !isEmpty(data.address) ? data.address : '';

  

  if (!Validator.isLength(data.text, { min: 2, max: 50000 })) {
    errors.text = 'Post must be between 2 and 50000 characters';
  }

  // if (Validator.isEmpty(data.address)) {
  //   errors.address = 'Address field is required';
  // }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};