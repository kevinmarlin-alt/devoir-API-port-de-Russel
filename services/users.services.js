const User = require('../models/user')

exports.getByEmail = async (email) => {
    return User.findOne({ email })
}

exports.save = async (user) => {
    return user.save()
}

exports.upDateOne = async (email, playload) => {
    return User.findOneAndUpdate({ email }, playload)
}

exports.delete = async (email) => {
    return User.deleteOne({ email })
}