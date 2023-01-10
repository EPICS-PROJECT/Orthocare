const router = require("express").Router();
const { signup, Login } = require("../controllers/patientAuth");
// const{signup}

router.post("/patient-signup", signup)
router.get("/patient-login", Login)

module.exports = router;