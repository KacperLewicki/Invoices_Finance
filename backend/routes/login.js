const express = require("express");
const router = express.Router();
const pool = require("../Config/db");

router.post('/login', (req,res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
   pool.query(sql, [ req.body.email,req.body.password ], (err,data) => {
        if(err){ 
            return res.json("Error");
        }
       if(data.length > 0){
            return res.json("Success");
        } 
       else {
            return res.json("Fail");
        }
    })
})

module.exports = router;