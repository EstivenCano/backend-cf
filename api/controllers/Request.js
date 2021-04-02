const { request } = require("express");
const admin = require("firebase-admin");
const ServiceAccount = require("../camino-flexible.json");
const db = admin.firestore();

async function createRequest(request, info) {
  const dbRef = db.collection("requests").doc();

  if (request !== null && info !== null) {
    await dbRef
      .set({
        documento: request.documento,
        nombres: request.nombres,
        apellidos: request.apellidos,
        instituto: request.instituto,
        correo: request.correo,
        telefono: request.telefono,
        comuna: request.comuna,
        docente: request.docente,
        c_docente: request.c_docente,
        id_convocatoria: info.id_convocatoria,
        convocatoria: info.convocatoria,
        pregrado: info.pregrado,
        materia: info.materia,
        id_grupo: info.id_grupo,
      })
      .then(() => {
        console.log("Aplicación registrada:\n " + request);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("No fue posible registrar la aplicación");
  }
}

async function getRequests() {
  const dbRef = db.collection("requests");
  const snapshot = await dbRef.get();
  const requests = [];
  snapshot.forEach((doc) => {
    requests.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return requests;
}


module.exports = {
  createRequest,
  getRequests,
};
