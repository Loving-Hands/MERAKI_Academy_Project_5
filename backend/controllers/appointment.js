const { pool } = require("../models/db.js");
exports.createAppointmentClinicIdByUserId = (req, res) => {
  const { clinicId, userId } = req.params;
  const { date_time } = req.body;
  const clinicQuery = "SELECT * FROM clinics WHERE id = $1";
  pool
    .query(clinicQuery, [clinicId])
    .then((clinicResult) => {
      if (clinicResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Clinic with ID ${clinicId} not found.`,
        });
      }
      const userQuery = "SELECT * FROM users WHERE id = $1";
      return pool.query(userQuery, [userId]);
    })
    .then((userResult) => {
      if (userResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `User with ID ${userId} not found.`,
        });
      }
      const insertQuery = `
          INSERT INTO appointment (date_time, status, user_id, clinic_id)
          VALUES ($1, $2, $3, $4)
          RETURNING *
        `;
      const status = "Scheduled";
      const values = [date_time, status, userId, clinicId];

      return pool.query(insertQuery, values);
    })
    .then((appointmentResult) => {
      res.status(201).json({
        success: true,
        message: "Appointment created successfully.",
        appointment: appointmentResult.rows[0],
      });
    })
    .catch((error) => {
      console.error("Error creating appointment:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to create appointment.",
        error: error.message,
      });
    });
};
exports.getAllAppointmentByClinicId = (req, res) => {
  const { clinicId } = req.params;
  pool
    .query(`SELECT * FROM appointment WHERE clinic_id=${clinicId}`)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(201).json({
          success: true,
          message: `No Appointment For this Clinic`,
          result: result.rows,
        });
      }
      return res.status(200).json({
        success: true,
        message: `All Appointment for this clinic is`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Internal server error.",
        error: err.message,
      });
    });
};
exports.getAppointmentByUserId = (req, res) => {
  const { userId } = req.token;

  //   ChatGPT Query
  pool
    .query(
      `
        SELECT a.id, a.date_time, a.status, a.user_id, a.clinic_id, c.name AS clinic_name
        FROM appointment AS a
        JOIN clinics AS c ON a.clinic_id = c.id
        WHERE a.user_id = $1
      `,
      [userId]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No appointments found.",
          result: [],
        });
      }
      const appointments = result.rows.map((appointment) => ({
        id: appointment.id,
        date_time: appointment.date_time,
        status: appointment.status,
        user_id: appointment.user_id,
        clinic_name: appointment.clinic_name,
      }));

      // Appointments found
      res.status(200).json({
        success: true,
        message: "Appointments retrieved successfully.",
        result: appointments,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Internal server error.",
        error: error.message,
      });
    });
};
exports.deleteAppointmentByClinicId = (req, res) => {};
