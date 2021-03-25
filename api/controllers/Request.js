
const admin = require('firebase-admin')
const ServiceAccount = require('../camino-flexible.json')

const db = admin.firestore();

async function createRequest(request,id_announcement,materia, id_grupo,documento) {

    console.log(id_announcement)
    const dbRef = db.collection('announcements').doc(id_announcement).
    collection('request').doc(materia).collection(id_grupo).doc(documento)
    if (request != null) {
        await dbRef.set(request
        ).then(() => {
            console.log("Aplicación registrada:\n " + request)
        }).catch((err) => {
            console.log(err)
        })
    } else {
        console.log("No fue posible registrar la aplicación")
    }
}

module.exports = {
   createRequest
}