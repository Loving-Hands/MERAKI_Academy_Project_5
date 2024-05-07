const { pool } = require("../models/db");

// Create New Comment Function 
const  Create_Comment = async (req, res) => {
    const {comment } = req.body;
    const query = `INSERT INTO ratings (comment) VALUES ($1) RETURNING *`;
    const value = [
        comment
    ];
    pool
      .query(query,value)
      .then((result) => {
        console.log(result.rows);
        res.status(201).json({
          success: true,
          massage: "Comment Add Successfully",
        });
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json({
          success: false,
          message: "Server Err",
        });
      });
  };

  module.exports = {
    Create_Comment
  };
  

