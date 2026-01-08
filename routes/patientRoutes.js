const express = require("express");
const router = express.Router();

const {
  registerPatient,
  loginPatient,
} = require("../controllers/patientController");

// REGISTER PATIENT
router.post("/register", registerPatient);

// LOGIN PATIENT
router.post("/login", loginPatient);

module.exports = router;
