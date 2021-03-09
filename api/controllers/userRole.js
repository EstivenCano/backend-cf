const admin = require('firebase-admin')

const ServiceAccount = require('../camino-flexible.json')

admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount)
});
const db = admin.firestore();


let addUser = async email => {
    console.log('Entro')
    const snapshot = await db.collection('users').get();
    console.log('Entro2')
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
    return snapshot
}

async function becomeModerator(email) {
    if (email === db.collection('users').doc(email)) {
        const dbRef = db.collection('users').doc(email)
        await dbRef.set({
            moderator: true,
            manager: true,
            teacher: true,
            student: true,
        })
        return;
    }
    throw {
        ok: false,
        mensaje: "El correo proporcionado no se encuentra registrado"
    }
}

module.exports = {
    addUser, becomeModerator
}
