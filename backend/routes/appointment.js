const express = require("express");
const appointmentRouter = express.Router();

const appointmentController = require("../controllers/appointment.js");
const authentication = require("../middleware/authentication");

appointmentRouter.post(
  "/:clinicId/",
  authentication,
  appointmentController.createAppointmentClinicIdByUserId
);
appointmentRouter.get(
  "/clinicApp",
  authentication,
  appointmentController.getAllAppointmentByClinicId
);

appointmentRouter.get(
  "/user/:userId",

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
