import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.config";

const initFirebase = () => {
  // Initialize Firebase
  initializeApp(firebaseConfig);
};

export default initFirebase;
