// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFlickaIw_gc32_OxTY3eC6mloYf5YnM8",
  authDomain: "tododatabase-1ec19.firebaseapp.com",
  projectId: "tododatabase-1ec19",
  storageBucket: "tododatabase-1ec19.appspot.com",
  messagingSenderId: "639995469439",
  appId: "1:639995469439:web:ff1a38ef61490a53e4a94a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
