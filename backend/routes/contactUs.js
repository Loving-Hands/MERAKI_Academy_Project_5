const express = require("express");
const contactUsRouter = express.Router();

const {
  createCountactUs,
  getAllContactUsForRoleAdmin,
} = require("../controllers/contactUs");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

contactUsRouter.post("/create", createCountactUs);
contactUsRouter.get("/", authentication, getAllContactUsForRoleAdmin);

module.exports = contactUsRouter;
