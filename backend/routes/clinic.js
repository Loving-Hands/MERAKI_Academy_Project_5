const express = require("express");
const clinkRouter = express.Router();
const {
  createClinic,
  getAllClinic,
  getAllClinicsBySpecializationId,
} = require("../controllers/clinic");
const authentication=require('../middleware/authentication')

clinkRouter.post("/create",authentication, createClinic);
clinkRouter.get("/", getAllClinic);
//clinkRouter.get("/:id", );
clinkRouter.get("/:id", getAllClinicsBySpecializationId);

module.exports = clinkRouter;
