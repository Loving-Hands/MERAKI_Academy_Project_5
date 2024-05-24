const express = require("express");
const routerDignostics = express.Router();

const {
  createDiginstoics,
  getAllDiagnosticsWithDoctorNames,
  getAllDiagnosticsByClinicId,
} = require("../controllers/diagnostics");
const authentication = require("../middleware/authentication");

routerDignostics.post(
  "/create/:clinicId/:userId",
  authentication,
  createDiginstoics
);
routerDignostics.get("/", authentication, getAllDiagnosticsWithDoctorNames);
routerDignostics.get(
  "/:clinicId",
  authentication,
  getAllDiagnosticsByClinicId
);

module.exports = routerDignostics;
