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
        "All fields are required",
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
  if (phone_number.length <= 9) {
    return res.status(400).json({
      success: false,
      message: "Phone number must be between 10",
    });
  }
  pool
    .query(
      `INSERT INTO users (full_name, age, phone_number, email, password, gender, role_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      value
    )
    .then((result) => {
      console.log(result.rows);
      res.status(200).json({
        success: true,
        message: "Account created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(409).json({
        success: false,
        message: "The email already exists",
        error: err,
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
          message:
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
            message:
              "The email doesn’t exist or the password you’ve entered is incorrect",
          });
        } else {
          const payload = {
            userId: result.rows[0].id,
            username: result.rows[0].full_name,
            role: result.rows[0].role_id,
            phone_number: result.rows[0].phone_number,

          };
          const options = {
            expiresIn: "6h",
          };
          const userToken = jwt.sign(payload, process.env.SECRET, options);
          res.status(200).json({
            success: true,
            message: `Login Successfully`,
            token: userToken,
            userId: result.rows[0].id,
            role_id: result.rows[0].role_id,
            username:result.rows[0].full_name

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

const getUser = (req, res) => {
  const userId = req.params.id;
  pool
    .query(
      `SELECT * FROM users WHERE id = $1;`,
      [userId]
    )
    .then((result) => {
      if (result.rows.length) {
        res.status(200).json({
          success: true,
          message: "User data retrieved successfully",
          user: result.rows[0],
        });
      } else {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err,
      });
    });
};

const changePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [userId]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = result.rows[0];

    const isValid = await bcryptjs.compare(currentPassword, user.password);

    if (!isValid) {
      return res.status(403).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hash_password = await bcryptjs.hash(newPassword, 10);

    await pool.query(
      `UPDATE users SET password = $1 WHERE id = $2`,
      [hash_password, userId]
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err,
    });
  }
};

module.exports = {
  register,
  login,
  getUser,
  changePassword
};
