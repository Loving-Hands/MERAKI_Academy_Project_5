const express = require("express");
const doctorRouter = express.Router();
const doctorController = require("../controllers/doctor.js");
// Import users controllers

doctorRouter.post("/register", doctorController.registerDoctor);
doctorRouter.post("/login", doctorController.loginDoctor);

module.exports = doctorRouter;
