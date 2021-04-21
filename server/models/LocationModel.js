const Mongoose = require('mongoose');
const validator = require('validator');

const locationModelSchema = new Mongoose.Schema({
  title: {
    type: String,
    min: [2, 'Location must contain at least 2 symbols'],
    max: [32, 'Location can\'t have more than 32 letters'],
    validate: {
      validator: val => !validator.contains(val, /\d/ ),
      message: 'Location must consists of letters'
    },
    required: true
  }
}, { timestamps: true });

const LocationModel = Mongoose.model('Location', locationModelSchema);

module.exports = LocationModel;