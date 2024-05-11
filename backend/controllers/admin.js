const bcryptjs = require("bcryptjs");
const { pool } = require("../models/db.js");
const jwt = require("jsonwebtoken");
exports.registerAdmin = async (req, res) => {
  const { full_name, password, email } = req.body;
  const role_id = 3;
  if (!full_name || !password || !email) {
    return res.status(400).json({
      success: false,
      message: "All fields (full_name, password, email ) are required",
    });
  }
  const encryptedPassword = await bcryptjs.hash(password, 9);
  const query = `INSERT INTO admins (full_name, password, email ,role_id ) VALUES ($1,$2,$3,$4) RETURNING *`;
  const data = [full_name, encryptedPassword, email.toLowerCase(), role_id];
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

exports.loginAdmin = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const query = `SELECT * FROM admins WHERE email = $1`;
  const data = [email.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        bcryptjs.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              adminId: result.rows[0].id,
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
