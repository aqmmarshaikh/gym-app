import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYBJ_273wF4BMomq2l5wzh5WjCfKvRcws",
  authDomain: "gym-web-2.firebaseapp.com",
  projectId: "gym-web-2",
  storageBucket: "gym-web-2.firebasestorage.app",
  messagingSenderId: "218666533604",
  appId: "1:218666533604:web:1b6a99e8b123250211e2f1",
  measurementId: "G-BF3LKTKB4R"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
