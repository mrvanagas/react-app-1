const Mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const idValidator = require('mongoose-id-validator');

const courseModelSchema = new Mongoose.Schema({
  title: {
    type: String,
    validate: {
      validator: val => validator.isLength(val, { min: 2, max: 32 }),
      message: 'Title must must contain from 2 to 32 symbols'
    },
    required: true,
    unique: true
  },
  description: {
    type: String,
    validate: {
      validator: val => validator.isLength(val, { max: 400 }),
      message: 'Description must must contain max 400 symbols'
    }

  },
  locations: {
    type: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Location' }],
    validate: {
      validator: (val) => val.length >= 1,
      message: 'Course must have at least one location'
    },
    required: true
  },
  requiredCourses: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Course' }]
}, { timestamps: true });

courseModelSchema.plugin(uniqueValidator);
courseModelSchema.plugin(idValidator);
const CourseModel = Mongoose.model('Course', courseModelSchema);

module.exports = CourseModel;