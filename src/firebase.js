import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB72xVAXo-1E0QVq-SrvjNGyrM8yH0rMv0",
  authDomain: "facebook-messenger-clone-860ca.firebaseapp.com",
  projectId: "facebook-messenger-clone-860ca",
  storageBucket: "facebook-messenger-clone-860ca.appspot.com",
  messagingSenderId: "485592453491",
  appId: "1:485592453491:web:c7135fe7d88d807a5f7506",
  measurementId: "G-C9FR8Z3SZK",
});

const db = firebaseApp.firestore();

export default db;
