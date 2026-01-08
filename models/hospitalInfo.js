const mongoose = require("mongoose");

const hospitalInfoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Sunrise Multi-Specialty Hospital",
    },

    description: {
      type: String,
      default: "A trusted hospital providing world-class treatments for 25+ years.",
    },

    vision: {
      type: String,
      default: "",
    },

    mission: {
      type: String,
      default: "",
    },

    achievements: {
      type: [String],
      default: [],
    },

    departments: {
      type: [String],
      default: [],
    },

    facilities: {
      type: [String],
      default: [],
    },


    totalStaff: {
      type: Number,
      default: 0,
    },

    totalDoctors: {
      type: Number,
      default: 0,
    },

    surgeriesPerformed: {
      type: Number,
      default: 0,
    },

    establishedYear: {
      type: Number,
      default: 2000,
    },

    founders: {
      type: [String],
      default: [],
    },

    contact: {
      phone: String,
      email: String,
      address: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HospitalInfo", hospitalInfoSchema);
