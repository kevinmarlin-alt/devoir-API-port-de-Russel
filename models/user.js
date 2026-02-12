const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcryptjs')

const User = new Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Le nom est requis'],
        match: /^[A-Za-z'-]+$/
    },
    email: {
        type: String,
        trim: true,
        required: [true, "L'email est requis"],
        unique: true,
        lowercase: true,
        match: /\b[A-Za-z0-9._%+-]+@russel-port\.fr\b/
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Le mot de pass est requis"],
        minLength: 8,
        match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    },
}, {
    timestamps: true
})

User.pre("save", async function() {
    if(!this.isModified("password")) {
        return
    }
    this.password = bcrypt.hashSync(this.password, 10)
})

module.exports = mongoose.model("User", User)