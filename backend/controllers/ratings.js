const { pool } = require("../models/db");

// Create New Comment Function
const createRatingByUserIdForClinic = (req, res) => {
  const { comment, rating } = req.body;
  const userId = req.token.userId;
  const clinicId = req.params.clinicId;
  const ratingDate = new Date();

  pool
    .query("SELECT * FROM clinics WHERE id = $1", [clinicId])
    .then((clinicResult) => {
      if (clinicResult.rows.length === 0) {
        throw new Error("Clinic not found");
      }

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
      if (err.message === "Clinic not found") {
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

// بدنا نجيب معدل التقييم لكل عيادة عن طريق (الاي دي) الخاص بالعيادة
const getAverageRatingByClinicId = (req, res) => {
  const clinicId = req.params.clinicId;
  const query =
    "SELECT AVG(rating) AS average_rating FROM ratings WHERE clinic_id = $1";
  const values = [clinicId];

  pool
    .query(query, values)
    .then((result) => {
      if (result.rows[0].average_rating === null) {
        return res.status(404).json({
          success: false,
          message: `No ratings found for clinic with ID ${clinicId}`,
          result: null,
        });
      }
      const averageRating = result.rows[0].average_rating;
      res.status(200).json({
        success: true,
        message: `Average Rating Of Clinic_ID =  ${clinicId}`,
        result: {
          clinic_id: clinicId,
          average_rating: averageRating,
        },
      });
    })
    .catch((error) => {
      console.error("Error executing SQL query:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        result: null,
      });
    });
};
// بدنا نجيب العيادات من الاعلى تقييم إلى الاقل تقييم ضمن الاختصاص الواحد
const getClinicsByTopRating = (req, res) => {
  const specializationId = req.params.specializationId;
  const order = req.query.order || 'desc'; // افتراضيا يكون ترتيب التصنيف تنازلي
  
  let orderByClause = 'ORDER BY ratings.rating DESC'; // ترتيب تصنيف التقييم بشكل افتراضي تنازلي

  if (order === 'asc') {
    orderByClause = 'ORDER BY ratings.rating ASC'; // ترتيب تصنيف التقييم بشكل تصاعدي
  }

  const query = `
    SELECT clinics.specialization, specialization.name_specialization, ratings.*
    FROM ratings
    INNER JOIN clinics ON ratings.clinic_id = clinics.id
    INNER JOIN specialization ON clinics.specialization = specialization.id
    WHERE specialization.id = $1
    ${orderByClause} -- استخدم الاستعلام الشرطي هنا لتحديد ترتيب الفرز
  `;

  pool
    .query(query, [specializationId])
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: `No ratings found for clinics with specialization ID ${specializationId}`,
          result: null,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Clinics sorted by rating in ${order} order`,
          result: result.rows,
        });
      }
    })
    .catch((error) => {
      console.error("Error executing SQL query:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        result: null,
      });
    });
};



const getAllClinicsById = (req, res) => {
  const { clinicid } = req.params;
  pool
    .query(
      `SELECT
  ratings.rating,
  ratings.comment,
  ratings.rating_date,
  users.full_name AS user_full_name
FROM
  ratings
JOIN
  users ON ratings.user_id = users.id
WHERE
  ratings.clinic_id = ${clinicid};`
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All comments`,
        result: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: `No comments`,
      });
    });
};
module.exports = {
  createRatingByUserIdForClinic,
  getAverageRatingByClinicId,
  getClinicsByTopRating,
  getAllClinicsById,
};
