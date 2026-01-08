const express = require("express");
const router = express.Router();

const {
  getHospitalInfo,
  updateHospitalInfo,
} = require("../controllers/hospitalInfoController");

const authenticateToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

// Public route
router.get("/", getHospitalInfo);

// Admin-protected route
router.put("/", authenticateToken, isAdmin, updateHospitalInfo);

module.exports = router;
