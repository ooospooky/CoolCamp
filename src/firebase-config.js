import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';//for db
import {getStorage} from 'firebase/storage';  //for img

const firebaseConfig = {
  apiKey: "AIzaSyAfzRjgiA3kEX-Q23RNAMXhd8nN1R_Bqj4",
  authDomain: "coolcamp-f0b6e.firebaseapp.com",
  projectId: "coolcamp-f0b6e",
  storageBucket: "coolcamp-f0b6e.appspot.com",
  messagingSenderId: "342548423584",
  appId: "1:342548423584:web:53d56eb64d5de09b427ac5",
  measurementId: "G-5C6EGV4MHH"
};

//存取各種config key

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export  const storage = getStorage(app)