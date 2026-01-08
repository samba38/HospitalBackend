const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");

const {
  bookAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateStatus,
} = require("../controllers/appointmentController");

// PATIENT: Book Appt
router.post("/book", authenticateToken, bookAppointment);

// PATIENT: Get My Appts
router.get("/patient", authenticateToken, getPatientAppointments);

// DOCTOR: Get My Appts
router.get("/doctor", authenticateToken, getDoctorAppointments);

// DOCTOR: Update Status
router.put("/:appointmentId", authenticateToken, updateStatus);

module.exports = router;
