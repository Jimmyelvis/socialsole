const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateRegisterInput(data) {

  let errors = [];

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';


  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.push({msg: 'Name must be between 2 and 30 characters'});
  }

  if (Validator.isEmpty(data.name)) {
    errors.push({msg: 'Name field is required'});
  }

  if (Validator.isEmpty(data.email)) {
    errors.push({msg: 'Email field is required'});
  }

  if (!Validator.isEmail(data.email)) {
    errors.push({msg: 'Email is invalid'});
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.push({msg: 'Password field is required'});
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.push({msg: 'Password must be at least 6 characters'});
  }

  if (Validator.isEmpty(data.password2)) {
    errors.push({msg: 'Confirm Password field is required'});
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.push({msg: 'Passwords must match'});
  }

  return {
    errors,
  }
  
}