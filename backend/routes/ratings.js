const express = require("express");
const rateRouter = express.Router();

const {
  createRatingByUserIdForClinic,
  getAverageRatingByClinicId,
  getClinicsByTopRating,
  getAllClinicsById,
} = require("../controllers/ratings");

const authentication = require("../middleware/authentication");
rateRouter.post("/:clinicId/", authentication, createRatingByUserIdForClinic);
rateRouter.get("/:clinicId", getAverageRatingByClinicId);
rateRouter.get("/specialization/:specializationId", getClinicsByTopRating);
rateRouter.get("/info/:clinicid", getAllClinicsById);

module.exports = rateRouter;
