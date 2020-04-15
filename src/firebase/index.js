import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAUFbafdP4VqW1U8-tMtSL2v-pZ5EBxcUw",
  authDomain: "motelroom18.firebaseapp.com",
  databaseURL: "https://motelroom18.firebaseio.com",
  projectId: "motelroom18",
  storageBucket: "motelroom18.appspot.com",
  messagingSenderId: "836569325554",
  appId: "1:836569325554:web:b5d79af88c098541f7d56b",
  measurementId: "G-D24B3WHQKE",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
