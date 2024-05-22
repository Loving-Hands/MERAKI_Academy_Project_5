const { pool } = require("../models/db.js");
// note
// احيب الدكتور والعياده بعدها اعمل الحجز
exports.createAppointmentClinicIdByUserId = (req, res) => {
  const { userId } = req.token;
  const { clinicId } = req.params;
  const { date, time, status } = req.body;
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
        INSERT INTO appointment (date , time, status, user_id, clinic_id)
        VALUES ($1, $2, $3, $4 , $5)
        RETURNING *
      `;

      const values = [date, time, status, userId, clinicId];

      return pool.query(insertQuery, values);
    })
    .then((appointmentResult) => {
      // Modify the appointment object to include date in the desired format
      const appointment = appointmentResult.rows[0];
      const formattedAppointment = {
        ...appointment,
        date: date.split("T")[0], // Use date from request body
        time: time.split("T")[0], // Use date from request body
      };

      res.status(201).json({
        success: true,
        message: "Appointment created successfully.",
        appointment: formattedAppointment,
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
      } else {
        res.status(200).json({
          success: true,
          message: `All Appointment for this clinic is`,
          result: result.rows,
        });
      }
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
  const { userId } = req.params;

  pool
    .query(
      `
        SELECT 
          a.id, 
          a.date, 
          a.time, 
          a.status, 
          a.user_id, 
          a.clinic_id, 
          c.name AS clinic_name,
          c.location AS clinic_location
        FROM 
          appointment AS a
        JOIN 
          clinics AS c ON a.clinic_id = c.id
        WHERE 
          a.user_id = $1
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
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        user_id: appointment.user_id,
        clinic_id: appointment.clinic_id, // Include clinic_id in the response
        clinic_name: appointment.clinic_name,
        clinic_location: appointment.clinic_location,
      }));

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

exports.deleteAppointmentByClinicId = (req, res) => {
  const { appointmentId } = req.params;
  const { doctorId } = req.token;
  console.log("🚀 ~ exports.deleteAppointmentByClinicId ~ doctorId:", doctorId);
  const clinicId = pool
    .query(`SELECT * FROM clinics WHERE doctor_id = $1`, [doctorId])
    .then((result) => {
      console.log(result.rows);
    })
    .catch((error) => {
      console.log(error);
    });

  pool
    .query("DELETE FROM appointment WHERE id = $1 RETURNING id, user_id", [
      appointmentId,
    ])
    .then((result) => {
      if (result.rowCount > 0) {
        const deletedAppointment = result.rows[0];
        const { user_id } = deletedAppointment;
        pool
          .query("SELECT full_name FROM users WHERE id = $1", [user_id])
          .then((userResult) => {
            const { full_name } = userResult.rows[0];
            res.status(200).json({
              success: true,
              message: `Appointment ${full_name} has been successfully deleted.`,
            });
          })
          .catch((userError) => {
            res.status(500).json({
              success: false,
              message: "Failed to fetch user's full name.",
              error: userError.message,
            });
          });
      } else {
        res.status(404).json({
          success: false,
          message: `No User For Deleted Appointment `,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Internal server error.",
        error: error.message,
      });
    });
};
exports.deleteAppointmentByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM appointment WHERE id = $1", [
      id,
    ]);

    if (result.rowCount > 0) {
      return res
        .status(200)
        .json({ success: true, message: "Appointment deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete appointment" });
  }
};
