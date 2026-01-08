const Patient = require("../models/patient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ---------------------------
// REGISTER PATIENT
// ---------------------------
exports.registerPatient = async (req, res) => {
  try {
    const { name, email, password, phone, address, age, gender } = req.body;

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new patient
    const newPatient = new Patient({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      age,
      gender,
    });

    await newPatient.save();

    res.status(201).json({
      message: "Patient registered successfully",
      patientId: newPatient._id,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// ---------------------------
// LOGIN PATIENT
// ---------------------------
exports.loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if patient exists
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: patient._id, role: "patient" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set token in HTTP-Only Cookie
    res.cookie("token", token, {
       httpOnly: true,
       secure: true,        // must be true on vercel
       sameSite: "none",    // required for cross-site cookies
       path: "/",           // cookie available for all routes
       maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      token,
      patientId: patient._id,
      name: patient.name,
      email: patient.email,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
