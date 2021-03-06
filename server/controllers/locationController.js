const LocationModel = require('../models/LocationModel');
const CourseModel = require('../models/CourseModel');
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

    const locationToDelete = await LocationModel.findById(id);
    if (locationToDelete === null)
      throw new Error(`Location with id '${id}' not found.`);
    // Surandame visus kursus, kurie turi trinamą lokaciją, kaip vienintelę lokaciją
    const courseDependentOnOnlyLocationToDelete = await CourseModel.find({ locations: { $in: [id], $size: 1 } });
    // WHERE MONGO OPERATORIUS NEGALIMAS ANT ATLASSO ESAMOS VERSIJOS
    // const coursesDependentOnLocation = await CourseModel.find({
    //   $where: function () {
    //     return this.locations.length === 1 && this.locations[0] === id;
    //   }
    // });

    // Jeigu yra kursų, kurie lokacijų masyve turi trinamają lokaciją, draudžiame trinimą
    if (courseDependentOnOnlyLocationToDelete.length > 0) {
      const coursesTitles = courseDependentOnOnlyLocationToDelete.map(({ title }) => title).join(', ');
      throw new Error(
        `Location is a single dependency in courses: ${coursesTitles}.Please delete these courses first or remove location dependency.`
      );
    }
    // Jeigu nėra lokacijų, kurie turėtų trinamą lokaciją kaip vienintelę priklausomybę, pašaliname trinamą lokaciją iš kursų lokacijų masyvo
    await CourseModel.updateMany(
      { locations: id }, // Pagal ką ieškome
      { $pull: { locations: id } } // Ką keičiame
    );
    // Ištriname lokaciją
    const deletedLocation = await LocationModel.findByIdAndDelete(id);
    res.status(200).json(deletedLocation);
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}
