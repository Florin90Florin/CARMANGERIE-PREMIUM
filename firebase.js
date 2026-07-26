import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

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
  getDocs,
  query,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  doc,
  setDoc
};

console.log("Firebase.js încărcat.");


export async function loadOffers() {
  const q = query(collection(db, "offers"));
  const snapshot = await getDocs(q);

  const offers = [];

  snapshot.forEach((doc) => {
  offers.push({
    ...doc.data(),
    id: doc.id
  });
});

  console.log("Oferte încărcate:", offers);

  return offers;
}
export async function saveOffer(offer) {
  await setDoc(
    doc(db, "offers", offer.id),
    offer
  );

  console.log("Oferta salvată:", offer.name);
}

export async function updateOffer(id, data) {
  await updateDoc(doc(db, "offers", id), data);
}

export async function deleteOfferFromDb(id) {
  await deleteDoc(doc(db, "offers", id));
}