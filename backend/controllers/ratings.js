const { pool } = require("../models/db");

// Create New Comment Function
const createRatingByUserIdForClinic = (req, res) => {
  const { comment, rating } = req.body;
  const userId = req.token.userId;
  const clinicId = req.params.clinicId; // Correctly access clinicId from req.params
  const ratingDate = new Date(); 

  // Check if the clinic exists before inserting the rating
  pool.query('SELECT * FROM clinics WHERE id = $1', [clinicId])
    .then((clinicResult) => {
      // Check if the clinic exists
      if (clinicResult.rows.length === 0) {
        throw new Error('Clinic not found');
      }

      // Insert the rating into the ratings table
      const query = `INSERT INTO ratings (comment, rating, rating_date, clinic_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const values = [comment, rating, ratingDate, clinicId, userId];
      
      return pool.query(query, values);
    })
    .then((result) => {
      console.log(result.rows);
      res.status(201).json({
        success: true,
        message: "Comment Added Successfully",
      });
    })
    .catch((err) => {
      console.error("Error executing SQL query:", err);
      if (err.message === 'Clinic not found') {
        res.status(404).json({
          success: false,
          message: "Clinic not found",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
      }
    });
};


module.exports = {
  createRatingByUserIdForClinic,
};
// :clincId/