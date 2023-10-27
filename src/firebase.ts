import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "mingle-web",
  storageBucket: "mingle-web.appspot.com",
  messagingSenderId: "704363801580",
  appId: "1:704363801580:web:3afb7ca3ee8371e52a6ec9",
  measurementId: "G-DW7RTWE0JX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
