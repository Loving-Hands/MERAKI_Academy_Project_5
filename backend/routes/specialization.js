const express = require("express");
const specializationRouter = express.Router();
const specializationController = require("../controllers/specialization.js");
specializationRouter.post(
  "/",
  specializationController.createNewSpecialization
);
specializationRouter.get("/", specializationController.getAllSpecialization);
specializationRouter.put(
  "/:id",
  specializationController.editSpecializationById
);
module.exports = specializationRouter;
