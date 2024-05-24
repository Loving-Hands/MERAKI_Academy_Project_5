const express = require("express");
const clinkRouter = express.Router();
const {
  createClinic,
  getAllClinic,
  getAllClinicsBySpecializationId,
  getClinicById,
  
} = require("../controllers/clinic");
const authentication = require("../middleware/authentication");

clinkRouter.post("/create", authentication, createClinic);
clinkRouter.get("/", getAllClinic);
clinkRouter.get("/info/:clinicId", getClinicById);
clinkRouter.get("/:id", getAllClinicsBySpecializationId);

module.exports = clinkRouter;
