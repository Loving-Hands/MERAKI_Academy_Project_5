const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/admin.js");

adminRouter.post("/register", adminController.registerAdmin);
adminRouter.post("/login", adminController.loginAdmin);

module.exports = adminRouter;
