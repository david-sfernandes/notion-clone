import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjuSxxN2Vdt-yrV5BzentVIUALEQ7Oq_s",
  authDomain: "notion-clone-6034a.firebaseapp.com",
  projectId: "notion-clone-6034a",
  storageBucket: "notion-clone-6034a.firebasestorage.app",
  messagingSenderId: "494870342017",
  appId: "1:494870342017:web:bd9263b7841d0f4bfce080",
};

const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
