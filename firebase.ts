// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCLGeMEItfIKRkk7EWixjouKJLUQ6UH3Pc",
    authDomain: "wordle-insights.firebaseapp.com",
    databaseURL: "https://wordle-insights-default-rtdb.firebaseio.com",
    projectId: "wordle-insights",
    storageBucket: "wordle-insights.appspot.com",
    messagingSenderId: "683691692918",
    appId: "1:683691692918:web:bf25b8b7f4661efbe72057",
    measurementId: "G-5JWVEQT2R0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.addScope('profile');
googleAuthProvider.addScope('email');