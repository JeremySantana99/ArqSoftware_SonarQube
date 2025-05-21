import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";   // aqui cambio

const firebaseConfig = {
  apiKey: "AIzaSyBFtivKHpwqq_HuT83cAClVVu0aqsT_VtA",
  authDomain: "app-modelado.firebaseapp.com",
  projectId: "app-modelado",
  storageBucket: "app-modelado.firebasestorage.app",
  messagingSenderId: "977887459463",
  appId: "1:977887459463:web:af708a0b5704248e6a2022",
  measurementId: "G-FY0YG8FN98"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // aqui cambio

export { db };
