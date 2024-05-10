const { pool } = require("../models/db.js");
exports.createNewSpecialization = (req, res) => {
  const { name_specialization, image_specialization } = req.body;
  const query = `INSERT INTO specialization (name_specialization, image_specialization) VALUES ($1,$2) RETURNING *`;
  const data = [name_specialization, image_specialization];
  if (!name_specialization || !image_specialization) {
    return res.status(400).json({
      success: false,
      message:
        "All fields (specialization, image specialization ) are required",
    });
  }
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Specialization Created Successs",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Specialization Created Faild",
        err,
      });
    });
};
exports.getAllSpecialization = (req, res) => {
  pool
    .query(`SELECT * FROM "public"."specialization" LIMIT 100`)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All Specialization get success",
        result: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Faild Get All Specialization",
        error,
      });
    });
};

exports.editSpecializationById = (req, res) => {
  const { id } = req.params;

  if (req.token.role === 3) {
    const { name_specialization, image_specialization } = req.body;
    if (!name_specialization || !image_specialization) {
      return res.status(400).json({
        success: false,
        message:
          "Both 'name_specialization' and 'image_specialization' are required fields.",
      });
    }

    const query = {
      text: "UPDATE specialization SET name_specialization = $1, image_specialization = $2 WHERE id = $3 RETURNING *",
      values: [name_specialization, image_specialization, id],
    };

    pool
      .query(query)
      .then((result) => {
        if (result.rows.length === 0) {
          return res.status(404).json({
            success: false,
            message: `Specialization with ID ${id} not found.`,
          });
        }
        res.status(200).json({
          success: true,
          message: `Specialization with ID ${id} updated successfully.`,
          result: result.rows[0],
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Failed to update specialization.",
          error: err.message,
        });
      });
  }
  return res.status(500).json({
    message: `Sorry You Can't Make Any Changes Just Admin`,
  });
};
