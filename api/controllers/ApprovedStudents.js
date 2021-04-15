const admin = require("firebase-admin");
const ServiceAccount = require("../camino-flexible.json");
const MailService = require("../services/nodemailer");
const FileService = require("../services/files");

const db = admin.firestore();
const mail = new MailService();
const file = new FileService();

const sendMail = async (student) => {
  try {
    let template = file.readFile("templates/approve.html").toString();

    template = template.replace("estudiante", student.nombres);

    let response = mail.sendMail(
      template,
      student.correo,
      "Aprobación de aplicación"
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

const rejectMail = async (student, reason) => {
  try {
    let template = file.readFile("templates/reject.html").toString();

    template = template.replace("estudiante", student.nombres);
    template = template.replace("razon", reason);

    let response = mail.sendMail(
      template,
      student.correo,
      "Aplicación rechazada"
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

async function addApprovedStudent(student, requestId) {
  const dbRef = db.collection("approvedStudents");
  const request = db.collection("requests");
  if (student !== null) {
    await dbRef
      .doc()
      .set(student)
      .then(() => {
        console.log("Estudiante aprobado registrado:\n " + student);
        request
          .doc(requestId)
          .delete()
          .then(() => {
            console.log("Borrado");
          });
      })
      .then(() => {
        sendMail(student);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("No fue posible registrar el estudiante");
  }
}

async function rejectStudent(student, requestId, reason) {
  const request = db.collection("requests");
  if (student !== null) {
    rejectMail(student, reason);
    request
      .doc(requestId)
      .delete()
      .then(() => {
        console.log("Borrado");
      })
      .then(() => {
        rejectMail(student);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("No fue posible rechazar el estudiante");
  }
}

async function getApprovedStudents() {
  const dbRef = db.collection("approvedStudents");
  const snapshot = await dbRef.get();
  const approved = [];
  snapshot.forEach((doc) => {
    approved.push(doc.data());
  });
  return approved;
}

module.exports = {
  addApprovedStudent,
  getApprovedStudents,
  rejectStudent,
};
