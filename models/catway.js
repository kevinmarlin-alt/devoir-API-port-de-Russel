const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Catway = new Schema({
    catwayNumber: {
        type: Number,
        required: true,
        unique: true
    },
    catwayType: {
        type: String,
        enum: ["short", "long"],
        required: true
    },
    catwayState: {
        type: String,
        trim: true,
        default: "bon état"
    }
})

module.exports = mongoose.model("Catway", Catway)