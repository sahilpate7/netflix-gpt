// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAvFVOTbA2cLMgh9GlxlQyyXJ328DcQe-c",
    authDomain: "netflix-gpt-27b54.firebaseapp.com",
    projectId: "netflix-gpt-27b54",
    storageBucket: "netflix-gpt-27b54.firebasestorage.app",
    messagingSenderId: "167299365888",
    appId: "1:167299365888:web:bad796d9a6bb6b02e62ce5",
    measurementId: "G-5F2P5CQF7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();