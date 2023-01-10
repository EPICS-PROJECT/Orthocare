const user = require("../models/patient.js")
const jwt = require("jsonwebtoken")
const Emailvalidator = require("email-validator");

// exports.getPatientDetails = async(req, res) => {
//     const userId = await req.userId
//     try {
//         const userData = await user.findById({ _id: userId })
//         const followerData = await followers.findById({ _id: userId })
//         res.status(200).json({ userData, followerData })
//     } catch (err) {
//         res.status(401).json({ message: err })
//     }


// }

exports.signup = async(req, res) => {
    try {
        const { email, password, name, mobile_number } = req.body
        var loginId;
        if (email) {
            const validateEmail = Emailvalidator.validate(email)
            if (!validateEmail) return res.status(401).json({ message: "Invalid Email" });
            loginId = { email: email }
        }
        const User = new user();
        const loginDate = Date.now()
        User.email = loginId.email
        User.patient_name = name
        User.password = password;
        User.setPassword(password);
        User.mobile_number = mobile_number
        User.last_login = loginDate;
        // console.log(last_login)
        console.log(User);
        User.save((err, user) => {
            if (err) {
                return res.status(401).json({ "message": err })
            }
            res.status(200).json({ "User": user })
        })
    } catch (err) {
        console.log(err)
    }
}

exports.Login = async(req, res) => {
    try {
        const { email, password } = req.body
        var loginId;
        if (email) {
            const validateEmail = Emailvalidator.validate(email)
            if (!validateEmail) return res.status(401).json({ message: "Invalid Email" });
            loginId = { email: email }
        }
        const User = await user.findOne(loginId).select("+password")
        if (!User) {
            res.status(404).json({ message: "Invalid username or email" })
        }
        const verifiedPassword = User.validPassword(password)
        if (!verifiedPassword) {
            res.status(404).json({ message: "Ivalid User Password" })
        } else {
            const payload = { userId: User._id }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2d" })
            res.json({
                id: User._id,
                name: User.patient_name,
                token: token,
                verified: User.email_verified,
                message: "Login Success",
                email: User.email
            })
        }

    } catch (err) {
        console.log(err)
    }
}