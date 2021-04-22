const CourseRequestModel = require('../models/CourseRequestModel');
const Mongoose = require('mongoose');
const updateOptions = require('../config/updateOptions');

module.exports.getCourseRequests = async (req, res) => {
  try {
    const courseRequests = await CourseRequestModel.find({});
    res.status(200).json({ courseRequests });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
}

module.exports.getCourseRequest = async (req, res) => {
  const { id } = req.params;
  try {
    if (!Mongoose.Types.ObjectId.isValid(id))
      throw new Error('CourseRequest id is not valid');
    const courseRequests = await CourseRequestModel.findById(id);
    res.status(200).json({ courseRequests });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
}

module.exports.createCourseRequest = async (req, res) => {
  try {
    const newCourseRequest = await CourseRequestModel.create(req.body);
    res.status(200).json(newCourseRequest);
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports.updateCourseRequest = async (req, res) => {
  const { id } = req.params;
  try {
    if (!Mongoose.Types.ObjectId.isValid(id))
      throw new Error(`CourseRequest id is not valid`);
    const updatedCourseRequest = await CourseRequestModel.findOneAndUpdate({ _id: id }, req.body, updateOptions);
    if (updatedCourseRequest === null)
      throw new Error(`CourseRequest with id '${id}' not found.`);
    res.status(200).json(updatedCourseRequest);
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports.deleteCourseRequest = async (req, res) => {
  const { id } = req.params;
  try {
    if (!Mongoose.Types.ObjectId.isValid(id))
      throw new Error('CourseRequest id is not valid');
    const deletedCourseRequest = await CourseRequestModel.findByIdAndDelete(id);
    if (deletedCourseRequest === null)
      throw new Error(`CourseRequest with id '${id}' not found.`);
    res.status(200).json({ id });
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}
