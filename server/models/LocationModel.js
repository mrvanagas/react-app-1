const Mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const locationModelSchema = new Mongoose.Schema({
  title: {
    unique: true,
    type: String,
    validate: [
      { validator: val => !/\d/.test(val), message: 'Location must consists of letters' },
      { validator: val => validator.isLength(val, { min: 2, max: 32 }), message: 'Location must must contain from 2 to 32 symbols' },
    ],
    required: true,
  }
}, { timestamps: true });

locationModelSchema.plugin(uniqueValidator);
const LocationModel = Mongoose.model('Location', locationModelSchema);

module.exports = LocationModel;