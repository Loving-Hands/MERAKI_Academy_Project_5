const express = require("express");
const appointmentRouter = express.Router();

const appointmentController = require("../controllers/appointment.js");
const authentication = require("../middleware/authentication");

appointmentRouter.post(
  "/:clinicId/:userId",
  authentication,
  appointmentController.createAppointmentClinicIdByUserId
);
appointmentRouter.get(
  "/:clinicId",
  appointmentController.getAllAppointmentByClinicId
);

appointmentRouter.get(
  "/user/:userId",
  authentication,
  appointmentController.getAppointmentByUserId
);
appointmentRouter.delete(
  "/:clinicId/:appointmentId",
  authentication,
  appointmentController.deleteAppointmentByClinicId
);
appointmentRouter.delete(
  "/:id",
  authentication,
  appointmentController.deleteAppointmentByUserId
);

module.exports = appointmentRouter;
