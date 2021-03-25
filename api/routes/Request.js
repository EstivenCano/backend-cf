const express = require("express");
const router = express.Router();


const {
    createRequest
} = require('../controllers/Request')

router.post("/createRequest", (req,res)=>{
    let request = req.body.applyForm;
    let id_convocatoria = req.body.applyInfo.id_convocatoria
    let id_grupo = req.body.applyInfo.id_grupo
    let materia = req.body.applyInfo.materia
    let documento = req.body.applyForm.documento
    
    createRequest(request,id_convocatoria,materia,id_grupo,documento).then(resDB => {
        res.send({
            ok: resDB,
            mensaje: "Aplicación guardada"
        })
    }).catch(error => {
        res.send(error)
    })
})

module.exports = router