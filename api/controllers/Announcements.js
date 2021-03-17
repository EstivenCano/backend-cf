const admin = require('firebase-admin')
const ServiceAccount = require('../camino-flexible.json')

const db = admin.firestore();

async function createAnnouncement(announcement) {
    const dbRef = db.collection('announcements')
    if (announcement != null && announcement.descripcion != nul && announcement.cursos) {
        await dbRef.doc().set({
            descripcion: '',
            pregrado: '',
            cursos: [{
                curso: '',
                cupos: '',
                n_grupo:'',
                horario: [{
                    dia: '',
                    h_inicio:'',
                    h_fin:''
                },
                {
                    dia: '',
                    h_inicio:'',
                    h_fin:''
                },]
            }],
            fecha_inicio: '',
            fecha_fin: '',
        }).then(() => {
            console.log("Convocatoria registrada:\n " + announcement)
        }).catch((err) => {
            console.log(err)
        })
    } else {
        console.log("No fue posible registrar la convocatoria")
    }
    return "Convocatoria"
}

module.exports = {
    createAnnouncement
}