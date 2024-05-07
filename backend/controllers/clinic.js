const modalClinic = require("../routes/clinic");
const { pool } = require("../models/db");

const createClinic = (req, res) => {
  const { name, location, image_clinic, description, specialization } =
    req.body;
  const query = `INSERT INTO clinics (name, location, image_clinic, description , specialization) VALUES ($1,$2,$3,$4 ,$5) RETURNING *`;
  const values = [name, location, image_clinic, description, specialization];

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
    .query(`SELECT * FROM clinics `)
    .then((result) => {
      res.status(201).json(result.rows);
    })
    .catch((err) => {
      res.status(500).send("An error occurred while fetching clinics");
    });
};

const getClinicById = (req, res) => {
  const clinicId = req.params.id;
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

const getDoctorsBySpecialization = (req, res) => {
  const specializationId = req.params.id;
  console.log(specializationId);

  pool
    .query(
      `
      SELECT c.*, s.name_specialization 
      FROM clinics c 
      INNER JOIN specialization s ON c.specialization = s.id 
      WHERE c.specialization = $1
    `,
      [specializationId]
    )

    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).send("No clinics found for this specialization");
      } else {
        res.status(200).json(result.rows);
      }
    })
    .catch((error) => {
      console.error("Error fetching clinics:", error);
      res.status(500).send("An error occurred while fetching clinics data");
    });
};
module.exports = {
  createClinic,
  getAllClinic,
  getClinicById,
  getDoctorsBySpecialization,
};
