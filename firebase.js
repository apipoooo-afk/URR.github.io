// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBhlCI3LfdCnOJzrTbK59nxL-77VyF9Mm0",
  authDomain: "urrschool-system.firebaseapp.com",
  projectId: "urrschool-system",
  storageBucket: "urrschool-system.firebasestorage.app",
  messagingSenderId: "183740550258",
  appId: "1:183740550258:web:674b73d1843553574fc6eb",
  measurementId: "G-GHLCDECTDF"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
