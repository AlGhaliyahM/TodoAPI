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
var serviceAccount = require("./todo-669d8-firebase-adminsdk-mhyl2-0b8264a321.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// let dataRef = db.collection("TodoAPI");

// dataRef.get().then((querySnapshot) => {
//   querySnapshot.forEach((document) => {
//     console.log(document.id, "=>", document.data());
//   });
// });

// const data = {
//   1: " review API ",
// };

// db.collection("TodoAPI").doc().set(data);
// const firebase = require("firebase");
// const config = require("./config");

// const db = firebase.initializeApp(config.firebaseConfig);

module.exports = db;
