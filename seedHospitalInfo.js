require("dotenv").config();
const connectDB = require("./config/db");
const HospitalInfo = require("./models/hospitalInfo");

async function seedHospitalInfo() {
  try {
    await connectDB();

    await HospitalInfo.deleteMany();

    const info = {
      name: "Sunrise Multi-Specialty Hospital",
      description:
        "Sunrise Multi-Specialty Hospital is a premier healthcare institution committed to delivering world-class medical services with compassion, innovation, and excellence. Established in 1998, the hospital combines advanced medical technology with a team of highly experienced doctors, surgeons, and healthcare professionals. Sunrise Hospital is recognized for its patient-centric approach, ethical medical practices, and comprehensive treatment solutions across multiple specialties. With state-of-the-art infrastructure, modern ICUs, and round-the-clock emergency services, the hospital has earned the trust of thousands of patients over the past two decades.Sunrise Hospital is a leading multi-specialty medical center offering advanced healthcare services for over 24 years.",
      
      achievements: [
         "5000+ successful cardiac and neurological surgeries",
  "Awarded Best Multi-Specialty Hospital of the Year – 2023",
  "ISO 9001:2015 certified for quality healthcare services",
  "24/7 emergency, trauma care, and advanced ICU facilities",
  "Pioneered minimally invasive surgical techniques in the region",
  "Recognized for excellence in patient safety and care standards",
  "Successfully treated patients from over 15 countries",
  "First hospital in the region to implement digital health records"
      ],

      totalStaff: 320,

      departments: [
        "Cardiology",
        "Neurology",
        "Orthopedics",
        "Pediatrics",
        "General Surgery",
        "Dermatology",
        "ENT",
        "Oncology"
      ],

      facilities: [
  "Advanced ICU & NICU Units",
  "Fully Automated Diagnostic Labs",
  "Digital Patient Records System",
  "Modern Operation Theatres",
  "24/7 Pharmacy and Ambulance Services"
],

      surgeriesPerformed: 18000,

      establishedYear: 1998,

      founders: [
        "Dr. Ramesh Varma",
        "Dr. Anitha Rao"
      ],
    };

    await HospitalInfo.create(info);

    console.log("✔ Hospital Information Seeded Successfully!");
    process.exit(0);

  } catch (error) {
    console.log("Seed Error:", error);
    process.exit(1);
  }
}

seedHospitalInfo();
