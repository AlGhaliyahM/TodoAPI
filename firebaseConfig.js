const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyDh_OddZVVA9N2k49ATV40VYMh2wvp5ijo",
  authDomain: "todo-669d8.firebaseapp.com",
  projectId: "todo-669d8",
  storageBucket: "todo-669d8.appspot.com",
  messagingSenderId: "34860890863",
  appId: "1:34860890863:web:08e49f785adeba5a3db91a",
  measurementId: "G-J34BBXKLFF",
};

firebase.initializeApp(firebaseConfig); //initialize firebase app
const db = firestore();
module.exports = { firebase, db }; //export the app
