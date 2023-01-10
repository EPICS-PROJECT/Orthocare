const mongoose = require("mongoose")
const crypto = require("crypto")
const ObjectId = mongoose.Schema.Types.ObjectId
const patientSchema = new mongoose.Schema({
    patient_name: {
        type: String,
        required: true,
    },
    aws_rekog_id: {
        type: String,
        required: false
    },
    email: {
        type: String,
        requried: true,
        unique: true
    },
    password: {
        type: String,
    },
    salt: {
        type: String,
    },
    mobile_number: {
        type: Number,
        required: true,
    },
    reports: {
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
    }

}, { timestamps: true })

patientSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
}

patientSchema.methods.validPassword = function(verifypassword) {
    var password = crypto.pbkdf2Sync(verifypassword,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.password === password;
};


const patientModel = mongoose.model("Patient", patientSchema);
module.exports = patientModel;