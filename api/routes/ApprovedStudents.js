const express = require("express");
const router = express.Router();

const {
  addApprovedStudent,
  getApprovedStudents,
  approveEvidence,
  rejectStudent,
  rejectEvidence,
} = require("../controllers/ApprovedStudents");

router.post("/addApprovedStudent/:requestId", (req, res) => {
  let student = req.body;
  let request = req.params.requestId;
  if (Object.keys(student).length == 0) {
    res.send({
      ok: false,
      mensaje: "El estudiante no puede ser vacio",
    });
  } else {
    addApprovedStudent(student, request)
      .then((resDB) => {
        res.send({
          ok: true,
          mensaje: "Estudiante aprobado registrado",
        });
      })
      .catch((error) => {
        res.send(error);
      });
  }
});

router.post("/rejectStudent/:requestId", (req, res) => {
  let student = req.body.student;
  let reason = req.body.reason;
  let request = req.params.requesId;
  if (Object.keys(student).length == 0) {
    res.send({
      ok: false,
      mensaje: "El estudiante no puede ser vacio",
    });
  } else {
    rejectStudent(student, request, reason)
      .then((resDB) => {
        res.send({
          ok: true,
          mensaje: "La aplicación del estudiante ha sido rechazada",
        });
      })
      .catch((error) => {
        res.send(error);
      });
  }
});

router.post("/approveEvidence/:studentId", (req, res) => {
  let studentId = req.params.studentId;
  let studentMail = req.body.studentMail;
  if (studentId) {
    approveEvidence(studentId,studentMail)
      .then((resDB) => {
        res.send({
          ok: true,
          mensaje: "Evidencia aprobada registrada",
          response: resDB
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    res.send({
      ok: false,
      mensaje: "El id del estudiante no puede ser null",
    });
  }
});

router.post("/rejectEvidence", (req, res) => {
  let studentMail = req.body.studentMail;
  let reason = req.body.reason;
  if (studentMail) {
    rejectEvidence(studentMail,reason)
      .then((resDB) => {
        res.send({
          ok: true,
          mensaje: "Evidencia rechazada",
          response: resDB
        });
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    res.send({
      ok: false,
      mensaje: "El correo del estudiante no puede ser nulo",
    });
  }
});

router.get("/getApprovedStudents", (req, res) => {
  getApprovedStudents()
    .then((resDB) => {
      res.send({
        ok: true,
        mensaje: "Estudiantes consultados",
        students: resDB,
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
