
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdkLOznUOMpRXjn2IWVg01YFPWdQ695OU",
  authDomain: "devlink-b08c8.firebaseapp.com",
  projectId: "devlink-b08c8",
  storageBucket: "devlink-b08c8.firebasestorage.app",
  messagingSenderId: "288766631031",
  appId: "1:288766631031:web:c2cc87a447bb4a58f2fa72",
  measurementId: "G-TGMGXKNQ27"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };