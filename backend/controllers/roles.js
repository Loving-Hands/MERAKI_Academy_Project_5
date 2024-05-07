const { pool } = require("../models/db");

// This function creates new role
const createNewRole = (req, res) => {
  //TODO: write your code here
  const { name_role } = req.body;
  const value = [name_role];
  pool
    .query(`INSERT INTO roles (name_role) VALUES ($1) RETURNING *`, value)
    .then((result) => {
      console.log(result.rows);
      res.status(201).json({
        success: true,
        massage: "Role created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        massage: "Server error",
      });
    });
};

module.exports = {
  createNewRole,
};
