import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB2OYMKCGeNHTv--hGWX4aEsNEc4XVVVVg",
  authDomain: "test-holu.firebaseapp.com",
  projectId: "test-holu",
  storageBucket: "test-holu.appspot.com",
  messagingSenderId: "245822244477",
  appId: "1:245822244477:web:58c2aaf005255ea206d314",
  measurementId: "G-96LSM22G6Z"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
 
export { app, db }
