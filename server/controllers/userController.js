const UserModel = require('../models/UserModel');
const Mongoose = require('mongoose');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json({ users });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
}

module.exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!Mongoose.Types.ObjectId.isValid(id))
      throw new Error('User id is not valid');
    const users = await UserModel.findById(id);
    res.status(200).json({ users });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
}

module.exports.createUser = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(200).json(newUser);
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!Mongoose.Types.ObjectId.isValid(id))
      throw new Error(`User id is not valid`);
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedUser === null)
      throw new Error(`User with id '${id}' not found.`);
    res.status(200).json(updatedUser);
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!Mongoose.Types.ObjectId.isValid(id))
      throw new Error('User id is not valid');
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (deletedUser === null)
      throw new Error(`User with id '${id}' not found.`);
    res.status(200).json({ id });
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}