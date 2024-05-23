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
exports. getAllUsers = (req, res) => {
  pool
    .query(`SELECT * FROM "public"."users" LIMIT 100`)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All Users get success",
        result: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Faild Get All Users",
        error,error
      });
    });
};
exports.deleteClinicById = async (req, res) => {
  try {
    const { clinicId } = req.params;

    // Step 1: استعلم عن المواعيد المرتبطة بالعيادة
    const appointmentsResult = await pool.query(`SELECT id FROM "public"."appointment" WHERE clinic_id = $1`, [clinicId]);

    // Step 2: حذف المواعيد المرتبطة بالعيادة
    if (appointmentsResult.rowCount > 0) {
      const appointmentIds = appointmentsResult.rows.map(row => row.id);
      await pool.query(`DELETE FROM "public"."appointment" WHERE id IN (${appointmentIds.join(',')})`);
    }

    // Step 3: حذف العيادة نفسها
    const clinicDeleteResult = await pool.query(`DELETE FROM "public"."clinics" WHERE id = $1`, [clinicId]);

    if (clinicDeleteResult.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "Clinic and associated appointments deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Clinic not found",
      });
    }
  } catch (error) {
    if (error.code === "23503") {
      // Foreign key constraint violation
      res.status(400).json({
        success: false,
        message: "Cannot delete clinic because it is associated with existing appointments",
      });
    } else {
      // Other error
      console.error("Error deleting clinic:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete clinic",
        error: error.message,
      });
    }
  }
}
exports.deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(`DELETE FROM "public"."users" WHERE id = $1`, [userId]);

    if (result.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "Users deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    if (error.code === "23503") {
      // Foreign key constraint violation
      res.status(400).json({
        success: false,
        message: "Cannot delete user because it is associated with existing appointments",
      });
    } else {
      // Other error
      console.error("Error deleting clinic:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete user",
        error: error.message,
      });
    }
  }
};

exports.deletespecializationById = async (req, res) => {
  try {
    const { specializationId } = req.params;
    const result = await pool.query(`DELETE FROM "public"."specialization" WHERE id = $1`, [specializationId]);

    if (result.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "Specialization deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Specialization not found",
      });
    }
  } catch (error) {
    if (error.code === "23503") {
      // Foreign key constraint violation
      res.status(400).json({
        success: false,
        message: "Cannot delete Specialization because it is associated with existing appointments",
      });
    } else {
      // Other error
      console.error("Error deleting clinic:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete Specialization",
        error: error.message,
      });
    }
  }
};



