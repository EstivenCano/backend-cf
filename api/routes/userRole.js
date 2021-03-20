const express = require("express");
const router = express.Router();

const {
    isModerator, becomeModerator, addUser, getRoles
} = require('../controllers/userRole')


router.get("/roles/:email", (req,res)=>{
    let email = req.params.email;
    getRoles(email).then(resDB => {
        res.send({
            ok: true,
            roles: resDB,
            mensaje: "Roles de usuario consultado"
        })
    }).catch(error => {
        res.send(error)
    })
})

router.get("/isModerator/:email", (req, res) => {
    let email = req.params.email;
    isModerator(email).then(resDB => {
        res.send({
            ok: true,
            isModerator: resDB,
            mensaje: 'Consulta exitosa'
        })
    }).catch(error => {
        res.send(error)
    })
})

router.post("/becoMotor/:email", async function (req, res) {
    let email = req.params.email;
    let resDB = await becomeModerator(email)

    if (resDB === true) {
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
    
    let resDB = await addUser(email)

    if (resDB === true) {
        res.send({
            ok: true,
            mensaje: `El usuario ${email} ha sido registrado como estudiante`
        })
    } else {
        res.send({
            ok: false,
            mensaje: `El usuario ${email} ya se encuentra registrado`
        })
    }
})
module.exports = router
