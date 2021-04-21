const Mongoose = require('mongoose');
const validator = require('validator');


const courseModelSchema = new Mongoose.Schema({
  title: {
    type: String,
    min: [2, 'Location must contain at least 2 symbols'],
    max: [64, 'Location can\'t have more than 64 letters'],
    required: true
  },
  description: {
    type: String,
    max: [400, 'Location can\'t have more than 400 letters']
  },
  locations: {
    type: [{ type : Mongoose.Schema.Types.ObjectId, ref: 'Location' }],
    validate: {
      validator: (val) => val.length >= 1 ,
      message: 'Course must have at least one location'
    },
    required: true
  },
  requiredCourses: [{ type : Mongoose.Schema.Types.ObjectId, ref: 'Course' }]
}, { timestamps: true });

const CourseModel = Mongoose.model('Course', courseModelSchema);

module.exports = CourseModel;