const express = require("express");
const router = express.Router();

const {
  registerDoctor,
  loginDoctor,
  getAllDoctors,
  getDoctorById,
} = require("../controllers/doctorController");

// Public: register new doctor
router.post("/register", registerDoctor);

// Public: doctor login
router.post("/login", loginDoctor);

// Public: get all doctors (search/filter/paginate)
router.get("/all", getAllDoctors);

// Public: get single doctor by id
router.get("/:id", getDoctorById);

module.exports = router;
