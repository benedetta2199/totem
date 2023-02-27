import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxBgU42FTkuQBZiqLjO2sgw-LjM26nQc8",
  authDomain: "totem-656d0.firebaseapp.com",
  projectId: "totem-656d0",
  storageBucket: "totem-656d0.appspot.com",
  messagingSenderId: "630624124981",
  appId: "1:630624124981:web:1ce38e75827cccd8bf717c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
