const express = require("express");
const specializationRouter = express.Router();
const specializationController = require("../controllers/specialization.js");
const authentication = require("../middleware/authentication");
specializationRouter.post(
  "/create",
  authentication,
  specializationController.createNewSpecialization
);
specializationRouter.get("/", specializationController.getAllSpecialization);
specializationRouter.put(
  "/:id",
 
  specializationController.editSpecializationById
);
module.exports = specializationRouter;
