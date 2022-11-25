const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = [];

  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  data.text = !isEmpty(data.text) ? data.text : '';
  data.author = !isEmpty(data.author) ? data.author : '';
  // data.email = !isEmpty(data.email) ? data.email : '';
  data.headline = !isEmpty(data.headline) ? data.headline : '';
  data.fullheaderimage = !isEmpty(data.fullheaderimage) ? data.fullheaderimage : '';
  data.articleheaderimage = !isEmpty(data.articleheaderimage) ? data.articleheaderimage : '';



  if (!Validator.isLength(data.text, { min: 2})) {
    errors.push('Article must be at least 2 characters');
  }

  if (Validator.isEmpty(data.text)) {
    errors.push('Article field is required');
  }

  if (data.text === "<p><br></p>") {
    errors.push('Article field is required');
  }

  if (Validator.isEmpty(data.headline)) {
    errors.push('Headline field is required');
  }

  if (Validator.isEmpty(data.fullheaderimage)) {
    errors.push('A Full Header Image is needed for submission');
  }

  if (Validator.isEmpty(data.articleheaderimage)) {
    errors.push('A Article Header Image is needed for submission');
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};