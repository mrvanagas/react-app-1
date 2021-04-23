const CourseModel = require('../models/CourseModel');
const CourseRequestModel = require('../models/CourseRequestModel');
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
      const crossDependentCourses = await CourseModel.find({
        _id: { $in: req.body.requiredCourses }, // Tik tie kursai, kurių reikalaus šis kursas
        requiredCourses: id // Kursai, kurie turi šio kurso reikalavimą
      });
      if (crossDependentCourses.length > 0) {
        const titles = crossDependentCourses.map(({ title }) => title).join(', ');
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

    await CourseModel.updateMany(
      { requiredCourses: id },
      { $pull: { requiredCourses: id } }
    );
    /*
      1. Surasti visus <CourseRequest> kurie turi <Course> kaip priklausomybę
      2. Jeigu <CourseRequest> turi daugiau nei vieną priklausomybę - pašalinti trinamą kursą iš 
        <CourseRequest>.courses masyvo
      3. Jeigu trinamas <Course> yra vinitelė <CourseRequest> priklausomybė, tuomet turi būti trinamas
        VISAS <CourseRequest> įrašas
    */

    // 1. + 3. Triname tas užklausas, kurios kursą turi kaip vienintelę priklausomybę
    await CourseRequestModel.deleteMany({
      // Ką tokius trinsime?
      courses: {
        $size: 1, // Turi vieną elementą IR
        $in: [id] // Elementas yra trinamo kurso id
      }
    });

    // 1. + 2. Pašaliname trinamą kursą iš tų kursų užklausų, kurios turi trinamą kursą kaip priklausomybę,
    // bet turi dar ir kitų kursų
    await CourseRequestModel.updateMany(
      // Ką tokius keisime?
      {
        courses: id, // tuos kurie courses masyve turi trinamo kurso id IR
        'courses.1': { $exists: true }  // kursu užklausas kurios turi daugiau nei 1 elementą courses masyve
      },
      //  Kaip keisime?
      { $pull: { courses: id } }
    );

    const deletedCourse = await CourseModel.findByIdAndDelete(id);
    if (deletedCourse === null)
      throw new Error(`Course with id '${id}' not found.`);
    res.status(200).json({ id });
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}