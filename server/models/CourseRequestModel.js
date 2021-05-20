const Mongoose = require('mongoose');
const validator = require('validator');
const idValidator = require('mongoose-id-validator');

const courseRequestModelSchema = new Mongoose.Schema({
  personInfo: {
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
      email: {
        type: String,
        required: true,
        validate: { validator: validator.isEmail, message: 'Email is invalid' }
      },
      mobile: {
        type: String,
        required: true,
        validate: { validator: val => validator.isMobilePhone(val, 'lt-LT'), message: 'Mobile phone is not valid' }
      },
    }, { _id: false }),
    required: true
  },
  courses: {
    type: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    validate: {
      validator: (val) => val.length >= 1,
      message: 'Course request must have at least one Course'
    },
    required: true
  }
}, { timestamps: true });

courseRequestModelSchema.plugin(idValidator);
const CourseRequestModel = Mongoose.model('CourseRequest', courseRequestModelSchema);

module.exports = CourseRequestModel;