import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD8Esrid7V-JJ-N5K8gYXXEN0w_LAFSbG8",
  authDomain: "transaction012.firebaseapp.com",
  projectId: "transaction012",
  storageBucket: "transaction012.firebasestorage.app",
  messagingSenderId: "1068792290208",
  appId: "1:1068792290208:web:8a13bd4a77a87bb23fa2c5",
  measurementId: "G-LTBM317ZDQ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);