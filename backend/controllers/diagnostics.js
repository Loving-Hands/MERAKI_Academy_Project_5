const { pool } = require("../models/db");

const createDiginstoics = (req, res) => {
  const { diagnostics, image_diagnostics } = req.body;
  const doctorId = req.token.doctorId;
  const clinicId = req.params.clinicId;
  const userId = req.params.userId;
  const query = `INSERT INTO diagnostics (diagnostics, image_diagnostics, user_id, doctor_id, clinic_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [diagnostics, image_diagnostics, userId, doctorId, clinicId];

  pool
    .query(query, values)
    .then((result) => {
      res.status(201).json({ message: "created diagnostics" });
    })
    .catch((err) => {
      console.error("Error creating diagnostics:", err);
      res.status(500).send("An error occurred while adding the diagnostics");
    });
};

const getAllDiagnosticsWithDoctorNames = (req, res) => {
  const userId = req.token.userId;
  const query = `
        SELECT diagnostics.*, doctors.full_name AS doctor_name
        FROM diagnostics
        JOIN doctors ON diagnostics.doctor_id = doctors.id
        WHERE diagnostics.user_id = $1;`;
  pool
    .query(query, [userId])
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      console.error("Error retrieving diagnostics:", err);
      res.status(500).send("An error occurred while retrieving diagnostics");
    });
};

module.exports = {
  createDiginstoics,
  getAllDiagnosticsWithDoctorNames,
};
