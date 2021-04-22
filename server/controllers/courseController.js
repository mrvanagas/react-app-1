const CourseModel = require('../models/CourseModel');
const Mongoose = require('mongoose');
const updateOptions = require('../config/updateOptions');

module.exports.getCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find({});
    res.status(200).json({ courses });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
}

module.exports.getCourse = async (req, res) => {
  const { id } = req.params;
  try {
    if (!Mongoose.Types.ObjectId.isValid(id))
      throw new Error('Course id is not valid');
    const courses = await CourseModel.findById(id);
    res.status(200).json({ courses });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
}

module.exports.createCourse = async (req, res) => {
  try {
    const newCourse = await CourseModel.create(req.body);
    res.status(200).json(newCourse);
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  try {
    if (!Mongoose.Types.ObjectId.isValid(id))
      throw new Error(`Course id is not valid`);
    const updatedCourse = await CourseModel.findOneAndUpdate({ _id: id }, req.body, updateOptions);
    if (updatedCourse === null)
      throw new Error(`Course with id '${id}' not found.`);
    res.status(200).json(updatedCourse);
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    if (!Mongoose.Types.ObjectId.isValid(id))
      throw new Error('Course id is not valid');
    const deletedCourse = await CourseModel.findByIdAndDelete(id);
    if (deletedCourse === null)
      throw new Error(`Course with id '${id}' not found.`);
    res.status(200).json({ id });
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}
