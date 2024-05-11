const express = require("express");
const contactUsRouter = express.Router();

const {
  createCountactUs,
  getAllContactUsForRoleAdmin,
} = require("../controllers/contactUs");
const authentication = require("../middleware/authentication");

contactUsRouter.post("/create", createCountactUs);
contactUsRouter.get("/", getAllContactUsForRoleAdmin);

module.exports = contactUsRouter;
