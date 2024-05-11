const { pool } = require("../models/db.js");

const createCountactUs = (req, res) => {
  const { full_name, phone_number, email, comment } = req.body;
  pool
    .query(
      `INSERT INTO contactus (full_name,phone_number,email,comment) VALUES ($1,$2,$3,$4) RETURNING * `,
      [full_name, phone_number, email, comment]
    )
    .then((result) => {
      res
        .status(201)
        .json({ success: true, message: "Thank You We Contact You Soon" });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const getAllContactUsForRoleAdmin = (req, res) => {
  pool
    .query(`SELECT * FROM contactus `)
    .then((result) => {
      res.status(201).json({ result: result.rows });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

module.exports = { createCountactUs, getAllContactUsForRoleAdmin };
