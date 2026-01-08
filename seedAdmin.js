require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const Admin = require("./models/admin");

async function seedAdmin() {
  try {
    await connectDB();

    await Admin.deleteMany(); // optional

    const hashedPassword = await bcrypt.hash("AdminPass123!", 10);

    const admin = await Admin.create({
      name: "Samba raju",
      email: "admin@hospital.com",
      password: hashedPassword,
    });

    console.log("✔ Admin created successfully!");
    console.log("Email: admin@hospital.com");
    console.log("Password: AdminPass123!");

    process.exit(0);
  } catch (error) {
    console.log("Admin seeding error:", error);
    process.exit(1);
  }
}

seedAdmin();
