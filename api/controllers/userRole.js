const admin = require('firebase-admin')

const ServiceAccount = require('../camino-flexible.json')

admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount)
});
const db = admin.firestore();

async function isModerator(email){
    const dbRef = db.collection('users')
    const snapshot = await dbRef.where('moderator', '==', true).get();
    if (snapshot.empty) {
        console.log('No matching users.');
        return false;
    }
    const arDoc = []
    snapshot.forEach(doc => {
        arDoc.push(doc.id)
    });
    return arDoc.includes(email)
}

async function becomeModerator(email){

    const docRef = await db.collection("users").doc(email);
    var sucess = false
    await docRef.get().then((doc) => {
        if (doc.exists) {
            docRef.set({
                moderator: true,
                manager: true,
                student: true,
                teacher: true
            })
            sucess = true
        } else {
            sucess = false
        }
    }).catch((error) => {
        console.log(error)
    });
    return sucess
}

async function addUser(email){

    const docRef = await db.collection("users").doc(email);
    var sucess = false
    await docRef.get().then((doc) => {
        if (doc.exists) {
            docRef.set({
                moderator: false,
                manager: false,
                student: true,
                teacher: false
            })
            sucess = true
        } else {
            sucess = false
        }
    }).catch((error) => {
        console.log(error)
    });
    return sucess
}

module.exports = {
    isModerator, becomeModerator, addUser
}
