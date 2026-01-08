const mongoose = require("mongoose");

// PATIENT SCHEMA
const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    age: {
      type: Number,
      default: null,
    },

    gender: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } // createdAt & updatedAt auto added
);

// EXPORT MODEL
module.exports = mongoose.model("Patient", patientSchema);
