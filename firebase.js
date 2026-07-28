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
  setDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
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
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};

export {
  collection,
  addDoc,
  getDocs,
  query,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  doc,
  setDoc,
  onSnapshot
};




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


  return offers;
}
export async function saveOffer(offer) {
  await setDoc(
    doc(db, "offers", offer.id),
    offer
  ); 

  
}

export async function loadReservations() {
  const q = query(collection(db, "reservations"));
  const snapshot = await getDocs(q);

  const reservations = [];

  snapshot.forEach((doc) => {
    reservations.push({
      ...doc.data(),
      id: doc.id
    });
  });

  return reservations;
}

export async function saveReservation(reservation) {
  await setDoc(
    doc(db, "reservations", reservation.id),
    reservation
  );
}

export async function updateReservation(id, data) {
  await updateDoc(doc(db, "reservations", id), data);
}

export async function deleteReservationFromDb(id) {
  await deleteDoc(doc(db, "reservations", id));
}

export async function loadClients() {
  const q = query(collection(db, "clients"));
  const snapshot = await getDocs(q);

  const clients = [];

  snapshot.forEach((doc) => {
    clients.push({
      ...doc.data(),
      id: doc.id
    });
  });

  return clients;
}

export async function saveClient(client) {
  await setDoc(
    doc(db, "clients", client.id),
    client
  );
}

export async function updateClient(id, data) {
  await updateDoc(doc(db, "clients", id), data);
}

export async function deleteClientFromDb(id) {
  await deleteDoc(doc(db, "clients", id));
}


export async function updateOffer(id, data) {
  await updateDoc(doc(db, "offers", id), data);
}

export async function deleteOfferFromDb(id) {
  await deleteDoc(doc(db, "offers", id));
}