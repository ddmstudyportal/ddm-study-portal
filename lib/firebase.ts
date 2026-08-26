import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9uZmJj4B_8NIOKRMP-6wjBh_kqdNRVp0",
  authDomain: "ddm-study-portal.firebaseapp.com",
  projectId: "ddm-study-portal",
  storageBucket: "ddm-study-portal.firebasestorage.app",
  messagingSenderId: "1014195850647",
  appId: "1:1014195850647:web:8325b061586bc10cebc8d2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);