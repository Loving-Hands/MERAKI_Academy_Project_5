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

exports.getAllClinicSpecializationByID = (req, res) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM clinics WHERE specialization = $1", [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No clinics found",
          result: [],
        });
      }
      return res.status(200).json({
        success: true,
        message: "Clinics matched with the specified specialization",
        result: result.rows,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve clinics matched with specialization",
        error: error.message,
      });
    });
};
