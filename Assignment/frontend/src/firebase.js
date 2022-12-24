// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJJCIPl3BEdsYvOKEsDyllrkVt0pmg61U",
  authDomain: "ecommerceapp-6792a.firebaseapp.com",
  projectId: "ecommerceapp-6792a",
  storageBucket: "ecommerceapp-6792a.appspot.com",
  messagingSenderId: "330591878473",
  appId: "1:330591878473:web:8fbc39bdffcf89cfc2ee98",
  measurementId: "G-VGMF5B8DSM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;