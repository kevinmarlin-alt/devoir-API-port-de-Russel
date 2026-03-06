const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Nom de l'utilisateur
 *         email:
 *           type: string
 *           description: Email de l'utilisateur au format exemple@russell-port.fr
 *         password:
 *           type: string
 *           description: Mot de passe de l'utilisateur (doit être haché)
 * 
 */
const User = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        match: /^[\p{L}](?:[\p{L} '-]*[\p{L}])$/u
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
        match: /\b[A-Za-z0-9._%+-]+@russell-port\.fr\b/
    },
    password: {
        type: String,
        trim: true,
        required: true,
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