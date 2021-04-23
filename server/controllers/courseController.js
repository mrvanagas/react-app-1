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
    // Jeigu bandoma keisti reikiamų kursų masyvą
    if (req.body.requiredCourses !== undefined) {
      // Tikriname jog nebūtų bandoma į reikiamų kursų masyvą pridėti paties savęs
      if (req.body.requiredCourses.includes(id))
        throw new Error(`Course can't require itself`);
      // Tikrinimas, kad nebūtų kryžminių reikalavimų ( x kursui reikia y kurso, o y kursui reikia x kurso)
      const crossDependetCourses = await CourseModel.find({
        _id: { $in: req.body.requiredCourses }, // Tik tie kursai, kurių reikalaus šis kursas
        requiredCourses: id // Kursai, kurie turi šio kurso reikalavimą
      });
      if (crossDependetCourses.length > 0) {
        const titles = crossDependetCourses.map(({ title }) => title);
        throw new Error(`Cross dependency error: ${titles} already have this course as a required course.`);
      }
    }
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

    // 1. Surasti visus kursus, kuriem reikalingas šis trinamas kursas
    const dependentCourses = await CourseModel.find({
      requiredCourses: id // Kursai, kurie turi šio kurso reikalavimą
    });
    // 2. Ar yra tokių [1.] kursų?
    if(dependentCourses.length > 0){
      // taip: Pašalinti trinamą kursą iš kursų reikalavimų masyvų
      await CourseModel.updateMany(
        { requiredCourses: id }, // Pagal ką ieškome - kursai kurie <requiredCourse> masyve turi <id>
        { $pull: { requiredCourses: id } } // Ką keičiame - ištriname iš <requiredCourse> masyvo <id>
      );
    }
    // 3. Ištrinti kursą
    const deletedCourse = await CourseModel.findByIdAndDelete(id);
    if (deletedCourse === null)
      throw new Error(`Course with id '${id}' not found.`);
    res.status(200).json({ id });
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}