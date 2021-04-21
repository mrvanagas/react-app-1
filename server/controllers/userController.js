const UserModel = require('../models/UserModel')

module.exports.getUsers = (req, res) => {
    try{
        const users = await UserModel.find();
    } catch(ex){
        req.status(404).json
    }

}

module.exports.getUser = (req, res) => {
    
}

module.exports.createUser = (req, res) => {
    
}

module.exports.updateUser = (req, res) => {
    
}

module.exports.deleteUser = (req, res) => {
    
}