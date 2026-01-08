const Doctor = require("../models/doctor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ---------------------------------------
// REGISTER DOCTOR
// ---------------------------------------
exports.registerDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization, experience, phone, bio, operationsPerformed } = req.body;

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create doctor
    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      specialization,
      experience,
      phone,
      bio,
      operationsPerformed,
    });

    await newDoctor.save();

    res.status(201).json({
      message: "Doctor registered successfully",
      doctorId: newDoctor._id,
    });

  } catch (error) {
    console.error("Doctor Register Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};


// ---------------------------------------
// LOGIN DOCTOR
// ---------------------------------------
exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // JWT
    const token = jwt.sign(
      { userId: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Store in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Doctor login successful",
      token,
      doctorId: doctor._id,
      name: doctor.name,
      email: doctor.email,
    });

  } catch (error) {
    console.error("Doctor Login Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};


// ---------------------------------------
// GET ALL DOCTORS (SEARCH + FILTER + PAGINATION)
// ---------------------------------------
exports.getAllDoctors = async (req, res) => {
  try {
    let { search, specialization, page, limit } = req.query;

    // Default pagination
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const skip = (page - 1) * limit;

    let query = {};

    // Search doctor by name
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Filter by specialization
    if (specialization) {
      query.specialization = specialization;
    }

    const doctors = await Doctor.find(query)
      .skip(skip)
      .limit(limit);

    const total = await Doctor.countDocuments(query);

    res.status(200).json({
      data: doctors,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalDoctors: total,
    });

  } catch (error) {
    console.error("Get Doctors Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};


// ---------------------------------------
// GET DOCTOR BY ID
// ---------------------------------------
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);

  } catch (error) {
    console.error("Get Doctor Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
