const admin = require("firebase-admin");
const ServiceAccount = require("../camino-flexible.json");

const db = admin.firestore();

async function setTeacher(teacher) {
  const dbRef = db.collection("teachers");
  try {
    await dbRef
      .doc()
      .set(teacher)
      .then(() => {
        console.log("Profesor registrado:\n " + teacher);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  setTeacher
};
