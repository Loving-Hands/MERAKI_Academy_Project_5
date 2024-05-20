const express = require("express");
const userRouter = express.Router();
const { register,login,getUser,changePassword} = require("../controllers/users");
// Import users controllers

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get('/:id',getUser)
userRouter.post('/change-password', changePassword);

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
