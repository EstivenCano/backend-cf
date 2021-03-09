const express = require("express");
const router = express.Router();

const {
    addUser, becomeModerator
} = require('../controllers/userRole')


router.get("/addUser/:email", (req, res) => {
    let email = req.params.email;
    addUser(email).then(respuestaDB => {
        res.send({
            ok: true,
            info: {},
            mensaje: 'Usuario añadido correctamente'
        })
    }).catch(error => {
        res.send(error)
    })
})

router.post("/becoMotor/:email", (req, res) => {
    let email = req.params.email;
    becomeModerator(email).then(respuestaDB => {
        res.send({
            ok: true,
            mensaje: `El usuario ${email} se ha convertido en moderador`
        })
    }).catch(error => {
        res.send(error)
    })
})

module.exports = router
