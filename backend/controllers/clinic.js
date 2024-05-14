const modalClinic = require("../routes/clinic");
const { pool } = require("../models/db");

const createClinic = (req, res) => {
  const {
    name,
    location,
    image_clinic,
    description,
    time_open,
    time_close,
    specialization,
    open_days,
  } = req.body;
  const doctorId = req.token.doctorId;
  console.log(req.token);

  const query = `
    INSERT INTO clinics (name, location, image_clinic, description, time_open, time_close, specialization, open_days, doctor_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;

  const values = [
    name,
    location,
    image_clinic,
    description,
    time_open,
    time_close,
    specialization,
    open_days,
    doctorId,
  ];

  pool
    .query(query, values)
    .then((result) => {
      res.status(201).json({ message: "created clinic" });
    })
    .catch((err) => {
      res.status(500).send("an error occurred while adding the clinic");
    });
};

const getAllClinic = (req, res) => {
  pool
    .query(
      `
      SELECT 
        clinics.*,
        doctors.full_name AS doctor_name,
        specialization.name_specialization AS specialization_name,
        COALESCE(AVG(ratings.rating), 0) AS average_rating
      FROM 
        clinics
      LEFT JOIN 
        doctors ON clinics.doctor_id = doctors.id
      LEFT JOIN 
        ratings ON clinics.id = ratings.clinic_id
      LEFT JOIN 
        specialization ON clinics.specialization = specialization.id
      GROUP BY 
        clinics.id, doctors.full_name, specialization.name_specialization
    `
    )
    .then((result) => {
      res.status(201).json(result.rows);
    })
    .catch((err) => {
      res.status(500).send("An error occurred while fetching clinics");
    });
};

const getClinicById = (req, res) => {
  const { clinicId } = req.params;
  pool
    .query("SELECT * FROM clinics WHERE id = $1", [clinicId])
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).send("The clinic does not exist");
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch((error) => {
      res.status(500).send("An error occurred while fetching clinic data");
    });
};

const getAllClinicsBySpecializationId = (req, res) => {
  const specializationId = req.params.id;
  console.log(specializationId);
  const query = `
    SELECT * FROM clinics
    WHERE specialization = $1
  `;
  const values = [specializationId];

  pool
    .query(query, values)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((error) => {
      console.error("Error fetching clinics:", error);
      res.status(500).send("Error fetching clinics");
    });
};
module.exports = {
  createClinic,
  getAllClinic,
  getClinicById,
  getAllClinicsBySpecializationId,
};
