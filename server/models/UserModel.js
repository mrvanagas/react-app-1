const Mongoose = require('mongoose');
const validator = require('validator');

const userModelSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: { validator: validator.isEmail, message: 'Email is invalid' },
    unique: true
  },
  password: {
    type: String,
    validate: [
      { validator: val => validator.isAlphanumeric(val, 'en-US'), message: 'Password must consist of numbers and en-US letters' },
      {
        validator: (val) => validator.isStrongPassword(val, { minSymbols: 0 }),
        message: 'Password must consist of 8 symbols, one number, lowercase letter and upper case letter'
      },
    ],
    required: true,
  },
  role: {
    type: String,
    enum: ['STUDENT', 'MODERATOR', 'ADMIN'],
    default: 'STUDENT',
  },
  details: {
    type: new Mongoose.Schema({
      name: {
        type: String,
        required: true,
        min: [2, 'Name must consist of at least 2 letters'],
        max: [32, 'Name can\'t have more than 32 letters'],
        validate: { validator: validator.isAlpha, message: 'Name must consist only letters' }
      },
      surname: {
        type: String,
        required: true,
        min: [2, 'Surname must consist of at least 2 letters'],
        max: [32, 'Surname can\'t have more than 32 letters'],
        validate: { validator: validator.isAlpha, message: 'Name must consist only letters' }
      },
      mobile: {
        type: String,
        required: true,
        validate: { validator: val => validator.isMobilePhone(val, 'lt-LT'), message: 'Mobile phone is not valid' }
      },
    }, { _id: false }),
    required: true
  }
}, { timestamps: true });

const UserModel = Mongoose.model('User', userModelSchema);

module.exports = UserModel;
