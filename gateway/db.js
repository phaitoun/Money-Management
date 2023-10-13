var admin = require("firebase-admin");

var serviceAccount = require("./backend-23f30-firebase-adminsdk-t3xaf-a8da24d409.json");

const database = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = {
  firestore: database.firestore()
};