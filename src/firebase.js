// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZKKwPQuYxCHEhyeWFc1hk-OnCgQD18t4",
  authDomain: "realtor-108a1.firebaseapp.com",
  projectId: "realtor-108a1",
  storageBucket: "realtor-108a1.appspot.com",
  messagingSenderId: "506058217747",
  appId: "1:506058217747:web:66c78d1772670144abe2e6",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
