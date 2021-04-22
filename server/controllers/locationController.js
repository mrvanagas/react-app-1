const LocationModel = require('../models/LocationModel');
const Mongoose = require('mongoose');
const updateOptions = require('../config/updateOptions');

module.exports.getLocations = async (req, res) => {
  try {
    const locations = await LocationModel.find({});
    res.status(200).json({ locations });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
}

module.exports.getLocation = async (req, res) => {
  const { id } = req.params;
  try {
    if (!Mongoose.Types.ObjectId.isValid(id))
      throw new Error('Location id is not valid');
    const locations = await LocationModel.findById(id);
    res.status(200).json({ locations });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
}

module.exports.createLocation = async (req, res) => {
  try {
    const newLocation = await LocationModel.create(req.body);
    res.status(200).json(newLocation);
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports.updateLocation = async (req, res) => {
  const { id } = req.params;
  try {
    if (!Mongoose.Types.ObjectId.isValid(id))
      throw new Error(`Location id is not valid`);
    const updatedLocation = await LocationModel.findOneAndUpdate({ _id: id }, req.body, updateOptions);
    if (updatedLocation === null)
      throw new Error(`Location with id '${id}' not found.`);
    res.status(200).json(updatedLocation);
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports.deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    if (!Mongoose.Types.ObjectId.isValid(id))
      throw new Error('Location id is not valid');
    const deletedLocation = await LocationModel.findByIdAndDelete(id);
    if (deletedLocation === null)
      throw new Error(`Location with id '${id}' not found.`);
    res.status(200).json({ id });
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}
