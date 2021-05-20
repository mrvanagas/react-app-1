const Mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const userModelSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: { validator: validator.isEmail, message: 'Email is invalid' },
    unique: true
  },
  password: {
    type: String,
    minlength: 60,
    maxlength: 60,
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
        validate: [
          { validator: val => !/\d/.test(val), message: 'Name must consists of letters' },
          { validator: val => validator.isLength(val, { min: 2, max: 32 }), message: 'Name must must contain from 2 to 32 symbols' }
        ]
      },
      surname: {
        type: String,
        required: true,
        validate: [
          { validator: val => !/\d/.test(val), message: 'Surname must consists of letters' },
          { validator: val => validator.isLength(val, { min: 2, max: 32 }), message: 'Surname must must contain from 2 to 32 symbols' }
        ]
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

userModelSchema.plugin(uniqueValidator);
const UserModel = Mongoose.model('User', userModelSchema);

module.exports = UserModel;
