// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5XDuqSQf3gI1ZhRs9KgVrAHMWbJEjHjE",
  authDomain: "mohammed-55f1e.firebaseapp.com",
  projectId: "mohammed-55f1e",
  storageBucket: "mohammed-55f1e.appspot.com",
  messagingSenderId: "1012415959822",
  appId: "1:1012415959822:web:999aa41243b33d9ed3fd5f",
  measurementId: "G-75ZW8DBP71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()
export {auth,provider}