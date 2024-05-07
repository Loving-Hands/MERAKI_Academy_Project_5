const express = require("express");
const appointmentRouter = express.Router();

const appointmentController = require("../controllers/appointment.js");

// appointmentRouter.post("/", appointmentController.createNewAppointmentByUserId);
// appointmentRouter.get("/", appointmentController.getAppointmentByUserId);
// appointmentRouter.get("/", appointmentController.getAppointmentByClinicId);
// appointmentRouter.get("/", appointmentController.getAppointmentByDoctorId);

module.exports = appointmentRouter;
