const express = require("express");
const contactUsRouter = express.Router();

const contactUsController = require("../controllers/contactUs.js");

contactUsRouter.post("/", contactUsController.createContactUsForm);

module.exports = contactUsRouter;
