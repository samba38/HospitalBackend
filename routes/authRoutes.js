const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const { getMe, logout } = require("../controllers/authController");

router.get("/me", authenticateToken, getMe);
router.post("/logout", authenticateToken, logout);

module.exports = router;
