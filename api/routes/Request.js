const express = require("express");
const router = express.Router();


const {
    createRequest, getRequests, getRequestDocuments
} = require('../controllers/Request')

router.post("/createRequest", (req,res)=>{
    let request = req.body.applyForm;
    let info = req.body.applyInfo;
    console.log(request)
    console.log(info)
    createRequest(request,info).then(resDB => {
        res.send({
            ok: resDB,
            mensaje: "Aplicación guardada"
        })
    }).catch(error => {
        res.send(error)
    })
})

router.get("/getRequests", (req,res) => {

    getRequests().then(resDB => {
        res.send({
            ok: true,
            requests: resDB,
            mensaje: 'Consulta exitosa'
        })
    }).catch(error => {
        res.send(error)
    })
})


module.exports = router