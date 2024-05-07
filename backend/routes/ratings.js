const express = require("express");
const rateRouter = express.Router();
const { Create_Comment } = require("../controllers/ratings");
// Import users controllers

rateRouter.post("/creatComment", Create_Comment);

module.exports = rateRouter;