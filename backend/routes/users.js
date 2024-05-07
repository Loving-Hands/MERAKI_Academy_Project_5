const express = require("express");
const userRouter = express.Router();
const { register,login} = require("../controllers/users");
// Import users controllers

userRouter.post("/register", register);
userRouter.post("/login", login);

module.exports = userRouter;

/*
 * Testing Object:
{
  "firstName": "Sara",
  "lastName": "Ahmad",
  "age": 29,
  "country": "Jordan",
  "email":"sara.alahmad@gmai.com",
  "password": "123456",
  "role_id":"1"
}
*/
