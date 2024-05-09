const express = require("express");
const rateRouter = express.Router();
const { createRatingByUserIdForClinic,getAverageRatingByClinicId,getClinicsByTopRating } = require("../controllers/ratings");
// Import users controllers
const authentication=require('../middleware/authentication')

rateRouter.post("/:clinicId/",authentication,createRatingByUserIdForClinic);
rateRouter.get("/:clinicId",getAverageRatingByClinicId);
rateRouter.get("/specialization/:specializationId",getClinicsByTopRating);

module.exports = rateRouter;

