const HospitalInfo = require("../models/hospitalInfo");
const Doctor = require("../models/doctor");

// GET hospital info
exports.getHospitalInfo = async (req, res) => {
  try {
    const info = await HospitalInfo.findOne();
    const totalDoctors = await Doctor.countDocuments();

    res.status(200).json({
      ...info.toObject(),
      totalDoctors,
      totalOperations: info.surgeriesPerformed
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// UPDATE hospital info (admin only)
exports.updateHospitalInfo = async (req, res) => {
  try {
    const updated = await HospitalInfo.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });

    res.status(200).json({
      message: "Hospital information updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
