const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/admin.js");

adminRouter.post("/register", adminController.registerAdmin);
adminRouter.post("/login", adminController.loginAdmin);
adminRouter.get("/", adminController.getAllUsers);
adminRouter.delete("/removeclinic/:clinicId", adminController.deleteClinic);

module.exports = adminRouter;
