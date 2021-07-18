
import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB3BqZLI5r49BG_3iNyxWvepqnBbja-hAA",
    authDomain: "g1qs-ea949.firebaseapp.com",
    databaseURL: "https://g1qs-ea949-default-rtdb.firebaseio.com",
    projectId: "g1qs-ea949",
    storageBucket: "g1qs-ea949.appspot.com",
    messagingSenderId: "804021985155",
    appId: "1:804021985155:web:e434577bea3766d88860b6"
  };


export const initializeFirebase = () => {
// initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  return db
};

  