const validator = require('validator');

const mediumPasswordValidators = [
  { validator: val => val !== undefined, message: 'Password is required' },
  { validator: val => validator.isAlphanumeric(val, 'en-US'), message: 'Password must consist of numbers and en-US letters' },
  {
    validator: (val) => validator.isStrongPassword(val, { minSymbols: 0 }),
    message: 'Password must consist of 8 symbols, one number, lowercase letter and upper case letter'
  },
];

module.exports.isMediumPassword = (val) => {
  let error = '';
  mediumPasswordValidators.forEach(({ validator, message }) => {
    if (validator(val) !== true)
      error += message;
  });
  return error.length === 0 ? true : error;
}