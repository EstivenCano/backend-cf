const express = require("express");
const router = express.Router();

const {
    isModerator, becomeModerator, addUser
} = require('../controllers/userRole')


router.get("/isModerator/:email", (req, res) => {
    let email = req.params.email;
    isModerator(email).then(respuestaDB => {
        res.send({
            ok: true,
            isModerator: respuestaDB,
            mensaje: 'Consulta exitosa'
        })
    }).catch(error => {
        res.send(error)
    })
})

router.post("/becoMotor/:email", async function (req, res) {
    let email = req.params.email;
    let respuestaDB = await becomeModerator(email)

    if (respuestaDB === true) {
        res.send({
            ok: true,
            mensaje: `El usuario ${email} se ha convertido en moderador`
        })
    } else {
        res.send({
            ok: false,
            mensaje: `El usuario ${email} no se encuentra registrado`
        })
    }
})

router.post("/addUser/:email", async function (req, res) {
    let email = req.params.email;
    
    let respuestaDB = await addUser(email)

    if (respuestaDB === true) {
        res.send({
            ok: true,
            mensaje: `El usuario ${email} registrado como estudiante`
        })
    } else {
        res.send({
            ok: false,
            mensaje: `El usuario ${email} no se encuentra registrado`
        })
    }
})
module.exports = router
