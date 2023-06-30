
const firebase = require("firebase-admin");

const serviceAccount = require("../fir-67ba4-firebase-adminsdk-3d3km-3d870dc23a.json");
// Best practice: Get the credential file and db url from environment varible
const dbUrl = "https://fir-67ba4-default-rtdb.firebaseio.com/"; //You’ll get the DB Url from Firebase Console

module.exports = () => {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: dbUrl,
  });
  console.info("Initialized Firebase SDK");
};
