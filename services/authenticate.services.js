const User = require('../models/user')
const bcrypt = require('bcryptjs')

exports.findUser = async (email) => {
    return User.findOne({ email },'-__v -createdAt -updatedAt')
}

exports.compare = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}