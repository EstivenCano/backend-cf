const admin = require('firebase-admin')
const ServiceAccount = require('../camino-flexible.json')

const db = admin.firestore();

async function createAnnouncement(announcement) {
    const dbRef = db.collection('announcements')
    if (announcement != null && announcement.descripcion !== "" &&
        announcement.cursos.length !== 0) {
        await dbRef.doc().set(announcement
        ).then(() => {
            console.log("Convocatoria registrada:\n " + announcement)
        }).catch((err) => {
            console.log(err)
        })
    } else {
        console.log("No fue posible registrar la convocatoria")
    }
}


async function getAnnouncement() {
    const dbRef = db.collection('announcements')
    const snapshot = await dbRef.get();
    const announcements = []
    snapshot.forEach(doc => {
        announcements.push({
            id: doc.id,
            data: doc.data()
        })
    });
    return announcements;
}

module.exports = {
    createAnnouncement, getAnnouncement
}