const express = require("express");
const router = express.Router();

const {
    setTeacher
} = require('../controllers/Teacher')

router.post("/setTeacher", (req,res)=>{
    let teacher = req.body;
    setTeacher(teacher).then(resDB => {
        res.send({
            ok: true,
            mensaje: "Profesor guardado"
        })
    }).catch(error => {
        res.send(error)
    })
})


module.exports = router