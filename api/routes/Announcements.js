const express = require("express");
const router = express.Router();


const {
    createAnnouncement,
    getAnnouncement
} = require('../controllers/Announcements')

router.post("/createAnnouncement", (req,res)=>{
    let announcement = req.body;
    console.log(announcement)
    createAnnouncement(announcement).then(resDB => {
        res.send({
            ok: resDB,
            mensaje: "Convocatoria creada"
        })
    }).catch(error => {
        res.send(error)
    })
})

router.get("/announcements", (req,res)=>{
    getAnnouncement().then(resDB => {
        res.send({
            ok: resDB,
            mensaje: "Convocatorias consultadas"
        })
        console.log(resDB)
    }).catch(error => {
        res.send(error)
    })
})

module.exports = router
