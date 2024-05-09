const { pool } = require("../models/db.js");

const createCountactUs=(req,res)=>{
    const {full_name,phone_number,email,Comments}=req.body;
    pool.query(`INSERT INTO contactus (full_name,phone_number,email,Comments) VALUES ($1,$2,$3,$4) RETURNING * `,[full_name,phone_number,email,Comments])
    .then((result)=>{
        res.status(201).json({message : "created contactUs"})
    })
    .catch((err)=>{
        res.status(500).json({message:err})
    })
}

const getAllContactUsForRoleAdmin=(req,res)=>{
   pool.query(`SELECT * FROM contactus `)
   .then((result)=>{
    res.status(201).json(({message:"sucssfully "}))
   })
   .catch((err)=>{
    res.status(500).json({message:err})
   })


}


module.exports={createCountactUs,getAllContactUsForRoleAdmin}
