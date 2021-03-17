const express = require("express");
const router = express.Router();


const {
    createAnnouncement
} = require('../controllers/Announcements')

router.post("/createAnnouncement", (req,res)=>{
    let announcement = req.body;
    createAnnouncement(announcement).then(resDB => {
        res.send({
            ok: resDB,
            mensaje: "Convocatoria creada"
        })
    }).catch(error => {
        res.send(error)
    })
})

module.exports = router
