const admin = require("firebase-admin");
const ServiceAccount = require("../camino-flexible.json");
const MailService = require("../services/nodemailer");
const FileService = require("../services/files");

const db = admin.firestore();
const mail = new MailService();
const file = new FileService();

const approveMail = async (student) => {
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

const rejectEMail = async (studentMail, reason) => {
  try {
    let template = file.readFile("templates/eReject.html").toString();
    template = template.replace("razon", reason);

    let response = mail.sendMail(
      template,
      studentMail,
      "Evidencia rechazada"
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

const approveEMail = async (studentMail) => {
  try {
    let template = file.readFile("templates/eApprove.html").toString();

    let response = mail.sendMail(
      template,
      studentMail,
      "Evidencia aprobada"
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
        approveMail(student);
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

async function rejectEvidence(studentMail, reason) {
  if (studentMail) {
    rejectEMail(studentMail,reason)
  } else {
    console.log("No fue posible aprobar la evidencia del estudiante");
  }
}

async function approveEvidence(studentId, studentMail) {
  const approvedStudents = db.collection("approvedStudents");
  console.log(studentId);
  if (studentId) {
    await approvedStudents
      .doc(studentId)
      .update({
        evidencia: true,
      })
      .then(() => {
        console.log("Evidencia aprobado registrado!");
      })
      .then(() => {
        approveEMail(studentMail);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("No fue posible aprobar la evidencia del estudiante");
  }
}

async function getApprovedStudents() {
  const dbRef = db.collection("approvedStudents");
  const snapshot = await dbRef.get();
  const approved = [];
  snapshot.forEach((doc) => {
    approved.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return approved;
}

module.exports = {
  addApprovedStudent,
  getApprovedStudents,
  approveEvidence,
  rejectEvidence,
  rejectStudent,
};
