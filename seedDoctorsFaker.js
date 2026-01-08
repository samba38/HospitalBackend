// backend/seedDoctorsFaker.js
require("dotenv").config();
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");   // use bcryptjs
const { faker } = require("@faker-js/faker");
const Doctor = require("./models/doctor");

const SPECIALIZATIONS = [
  "Cardiology", "Neurology", "Orthopedics", "General Surgery", "Gynecology",
  "ENT", "Dermatology", "Pediatrics", "Urology", "Oncology"
];

async function runSeed() {
  try {
    await connectDB(); // connect to MongoDB

    // optional: clear existing doctors
    // await Doctor.deleteMany({});

    const doctors = [];

    for (let i = 1; i <= 30; i++) {

      const first = faker.person.firstName();
      const last = faker.person.lastName();

      const name = `Dr. ${first} ${last}`;
      const email = `dr.${first.toLowerCase()}.${last.toLowerCase()}.${i}@example.com`;

      const specialization = SPECIALIZATIONS[i % SPECIALIZATIONS.length];
      const experience = faker.number.int({ min: 2, max: 35 });

      const phone = faker.phone.number("9#########");
      const bio = faker.lorem.sentence(10);

      const operationsPerformed = [
        `${specialization} Procedure ${faker.number.int({ min: 1, max: 80 })}`,
        `${specialization} Procedure ${faker.number.int({ min: 81, max: 160 })}`,
      ];

      // default password for all seeded doctors
      const rawPassword = "SeedPass123!";
      const hashedPassword = await bcrypt.hash(rawPassword, 10);

      doctors.push({
        name,
        email,
        password: hashedPassword,
        specialization,
        experience,
        phone,
        bio,
        operationsPerformed,
      });
    }

    const inserted = await Doctor.insertMany(doctors);
  
    console.log(`✔ Inserted ${inserted.length} doctors`);
    console.log("✔ Login password for all seeded doctors: SeedPass123!");
    process.exit(0);
    
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

runSeed();
