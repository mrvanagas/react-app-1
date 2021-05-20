const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');
const { hashPassword } = require('../helpers/hash');
const { generateToken } = require('../middlewares/tokenAuth');
const { isMediumPassword } = require('../helpers/validate');

module.exports.authenticate = async (req, res) => {
  res.status(200).json({
    email: req.user.email,
    role: req.user.role,
    token: generateToken(req.user.email, req.user.role)
  });
}

module.exports.login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user === null) throw new Error('No user with such email');
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) throw new Error('Password is incorrect');
    const token = generateToken(user.email, user.role);
    res.status(200).json({ email: user.email, role: user.role, token });
  } catch ({ message }) {
    res.status(404).json({ message })
  }
}

module.exports.register = async (req, res) => {
  try {
    if (!!req.cookies['access_token']) throw new Error(`Please log out with current user first.`);
    const validationRes = isMediumPassword(req.body.password);
    if (validationRes !== true) throw new Error(validationRes);
    const hashedPassword = hashPassword(req.body.password)
    const newUser = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });
    const token = generateToken(newUser.email, newUser.role);
    res.status(200).json({ email: newUser.email, role: newUser.role, token });
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports.logout = async (req, res) => {
  res.status(200).json({ message: `User ${req.user.email} have logged out.` })
}