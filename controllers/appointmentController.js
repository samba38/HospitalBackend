const Appointment = require("../models/appointment");

// ----------------------------
// PATIENT: Book Appointment
// ----------------------------
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;

    const appointment = new Appointment({
      patient: req.user.userId,  // from JWT
      doctor: doctorId,
      date,
      time,
      reason,
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error("Book Appointment Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// -------------------------------------------
// PATIENT: Get My Appointments
// -------------------------------------------
exports.getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.userId })
      .populate("doctor", "name specialization");

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Get Patient Appointments Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// -------------------------------------------
// DOCTOR: Get Appointments for This Doctor
// -------------------------------------------
exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user.userId })
      .populate("patient", "name email phone");

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Get Doctor Appointments Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// -------------------------------------------
// DOCTOR: Update status
// -------------------------------------------
exports.updateStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    const allowed = ["approved", "rejected"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: "Status updated",
      appointment: updated,
    });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
