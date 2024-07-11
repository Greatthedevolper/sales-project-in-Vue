import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAcOWMpnWoRq45vQDPPXm_mY8ediRmxurE",
  authDomain: "vuetesttask-c6e85.firebaseapp.com",
  databaseURL: "https://vuetesttask-c6e85-default-rtdb.firebaseio.com",
  projectId: "vuetesttask-c6e85",
  storageBucket: "vuetesttask-c6e85.appspot.com",
  messagingSenderId: "746043673922"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
