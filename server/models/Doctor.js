const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const doctorSchema = new mongoose.Schema({
    doctor_name: {
        type: String,
        required: true,
    },
    aws_rekog_id: {
        type: true,
        unique: true,
        required: false
    },
    email: {
        type: String,
        requried: true,
        unique: true
    },
    mobile_number: {
        type: Number,
        required: true,
        min: 10,
        max: 10
    },
    hospitalDetails: {
        type: Array,
        default: []
    },
    last_login: {
        type: String,
    },
    appointments: {
        scheduled: [],
        completed: []
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    doctor_verified: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const doctorModel = mongoose.model("Doctor", doctorSchema);
module.exports = doctorModel;