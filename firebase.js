import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBWM1IoRpPnWVg6vfiUZBtNHhQe8aMBZ3Q",
  authDomain: "carmangerie-premium.firebaseapp.com",
  projectId: "carmangerie-premium",
  storageBucket: "carmangerie-premium.firebasestorage.app",
  messagingSenderId: "111257854691",
  appId: "1:111257854691:web:e847a9a6699829b4111bd6",
  measurementId: "G-BS73SRJ409"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export {
  collection,
  addDoc,
  serverTimestamp
};

console.log("Firebase conectat cu succes!");