import firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCGuiAkDXwajRIygeIFtUudT4AOtWAmcyA",
  authDomain: "chat-app-aa126.firebaseapp.com",
  databaseURL:
    "https://chat-app-aa126-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-app-aa126",
  storageBucket: "chat-app-aa126.appspot.com",
  messagingSenderId: "913906634287",
  appId: "1:913906634287:web:18645d7dff2532947300da",
  measurementId: "G-S506E6W1JZ",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export default firebase;
