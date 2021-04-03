const express = require("express");
const router = express.Router();

const {
  addApprovedStudent,
  getApprovedStudents,
} = require("../controllers/ApprovedStudents");

router.post("/addApprovedStudent", (req, res) => {
  let student = req.body;
  if (Object.keys(student).length == 0) {
    res.send({
        ok: false,
        mensaje: "El estudiante no puede ser vacio",
      });
  }
  else{
    addApprovedStudent(student)
    .then((resDB) => {
      res.send({
        ok: resDB,
        mensaje: "Estudiante aprobado registrado",
      });
    })
    .catch((error) => {
      res.send(error);
    });
  }
});

router.get("/getApprovedStudent", (req, res) => {
  getApprovedStudents()
    .then((resDB) => {
      res.send({
        ok: resDB,
        mensaje: "Estudiantes consultados",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
