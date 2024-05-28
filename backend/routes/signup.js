const express = require("express");
const router = express.Router();
const pool = require("../Config/db");

router.post('/signup', (req,res) => {
    const sql = "INSERT INTO login (`name`, `email`,`password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
    ];

    pool.query(sql, [values], (err, data)=> {
        if(err){ 
            return res.json("Error");
        }
        return res.json(data);
    });
});

module.exports = router;