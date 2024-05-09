const express = require("express");
const rateRouter = express.Router();
const { createRatingByUserIdForClinic } = require("../controllers/ratings");
// Import users controllers
const authentication=require('../middleware/authentication')

rateRouter.post("/:clinicId/",authentication,createRatingByUserIdForClinic);

module.exports = rateRouter;

