// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth";
import {getFirestore } from "firebase/firestore";

const firebaseConfig = require('./firebaseConfig');

// Initialize Firebase
export const app = initializeApp({...firebaseConfig, projectId: firebaseConfig.projectId});
export const db = getFirestore(app);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.addScope('profile');
googleAuthProvider.addScope('email');