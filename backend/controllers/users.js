const {pool} = require("../models/db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// This function creates (new user)
const register = async (req, res) => {
  const { full_name, age, phone_number, email, password, gender } = req.body;
  const role_id = 1;
  if (
    !full_name ||
    !phone_number ||
    !password ||
    !email ||
    !gender 
  ) {
    return res.status(400).json({
      success: false,
      message:
        "All fields (full_name, phone_number, password, email, gender ) are required",
    });
  }
  const hash_password = await bcryptjs.hash(password, 10);

  const value = [
    full_name,
    age,
    phone_number,
    email.toLowerCase(),
    hash_password,
    gender,
    role_id,
  ];
  pool
    .query(
      `INSERT INTO users (full_name, age, phone_number, email, password, gender, role_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      value
    )
    .then((result) => {
      console.log(result.rows);
      res.status(201).json({
        success: true,
        massage: "Account created successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(409).json({
        success: false,
        message: "The email already exists",
      });
    });
};

const login = (req, res) => {
  //TODO: write your code here
  const { email, password } = req.body;
  const value = [email.toLowerCase()];
  pool
    .query(
      `SELECT *
      FROM users
      WHERE email = $1;`,
      value
    )
    .then(async (result) => {
      console.log(result.rows);
      if (!result.rows.length)
        res.status(403).json({
          success: false,
          massage:
            "The email doesn’t exist or the password you’ve entered is incorrect",
        });
      else {
        const isValid = await bcryptjs.compare(
          password,
          result.rows[0].password
        );
        console.log(isValid);
        if (!isValid) {
          res.status(403).json({
            success: false,
            massage:
              "The email doesn’t exist or the password you’ve entered is incorrect",
          });
        } else {
          const payload = {
            userId: result.rows[0].id,
            phone_number: result.rows[0].phone_number,
            role: result.rows[0].role_id,
          };
          const options = {
            expiresIn: "6h",
          };
          const userToken = jwt.sign(payload, process.env.SECRET, options);
          res.status(200).json({
            success: true,
            massage: "Valid login credentials",
            token: userToken,
            userId: result.rows[0].id,
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message:
          "Server Error",
        error : err,
      });
    });
};

module.exports = {
  register,
  login,
};
