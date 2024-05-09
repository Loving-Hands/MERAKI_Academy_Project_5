const express = require("express");
const rateRouter = express.Router();
const { createRatingByUserIdForClinic,getAllRatingByClinicId } = require("../controllers/ratings");
// Import users controllers
const authentication=require('../middleware/authentication')

rateRouter.post("/:clinicId/",authentication,createRatingByUserIdForClinic);
rateRouter.get("/:clinicId",getAllRatingByClinicId);

module.exports = rateRouter;

