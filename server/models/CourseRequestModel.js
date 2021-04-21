const Mongoose = require('mongoose');
const validator = require('validator');

const courseRequestModelSchema = new Mongoose.Schema({
  personInfo: {
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


const CourseRequestModel = Mongoose.model('CourseRequest', courseRequestModelSchema);

module.exports = CourseRequestModel;