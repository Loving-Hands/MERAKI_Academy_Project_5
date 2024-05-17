const bcryptjs = require("bcryptjs");
const { pool } = require("../models/db.js");
const jwt = require("jsonwebtoken");
exports.registerDoctor = async (req, res) => {
  const {
    full_name,
    phone_number,
    password,
    email,
    gender,
    image_doctor,
    specialization_doctor,
  } = req.body;
  const role_id = 2;
  if (
    !full_name ||
    !phone_number ||
    !password ||
    !email ||
    !gender ||
    !image_doctor ||
    !specialization_doctor
  ) {
    return res.status(400).json({
      success: false,
      message:
        "All fields (full_name, phone_number, password, email, gender ,image_doctor , specialization_doctor ) are required",
    });
  }
  const encryptedPassword = await bcryptjs.hash(password, 9);
  const query = `INSERT INTO doctors (full_name, phone_number, password, email, gender ,role_id , image_doctor ,specialization_doctor) VALUES ($1,$2,$3,$4,$5,$6 ,$7,$8) RETURNING *`;
  const data = [
    full_name,
    phone_number,
    encryptedPassword,
    email.toLowerCase(),
    gender,
    role_id,
    image_doctor,
    specialization_doctor,
  ];
  if (phone_number.length <= 9) {
    return res.status(400).json({
      success: false,
      message: "Phone number must be between 10",
    });
  }
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Account created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "The email already exists",
        err,
      });
    });
};

exports.loginDoctor = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const query = `SELECT * FROM doctors WHERE email = $1`;
  const data = [email.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        bcryptjs.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              doctorId: result.rows[0].id,
              country: result.rows[0].country,
              role: result.rows[0].role_id,
            };
            const options = { expiresIn: "1d" };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);
            if (token) {
              return res.status(200).json({
                token,
                success: true,
                message: `Login Successfully`,
                doctorId: result.rows[0].id,
                role_id: result.rows[0].role_id
              });
            } else {
              throw Error;
            }
          } else {
            res.status(403).json({
              success: false,
              message: `The email doesn’t exist or the password you’ve entered is incorrect`,
            });
          }
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
        err,
      });
    });
};
