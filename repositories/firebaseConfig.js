const firebaseConfig = {
  apiKey: "AIzaSyDh_OddZVVA9N2k49ATV40VYMh2wvp5ijo",
  authDomain: "todo-669d8.firebaseapp.com",
  projectId: "todo-669d8",
  storageBucket: "todo-669d8.appspot.com",
  messagingSenderId: "34860890863",
  appId: "1:34860890863:web:08e49f785adeba5a3db91a",
  measurementId: "G-J34BBXKLFF",
};

var admin = require("firebase-admin");
var serviceAccount = require("./todo-669d8-firebase-adminsdk-mhyl2-928a3b9460.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
