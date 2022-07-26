import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXm1vQtFkjIv1sewyFg6o0NYH7jSD6bDM",
  authDomain: "monkey-blog-3b18a.firebaseapp.com",
  projectId: "monkey-blog-3b18a",
  storageBucket: "monkey-blog-3b18a.appspot.com",
  messagingSenderId: "519721452929",
  appId: "1:519721452929:web:de3fc610906a7d3e071480",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
