// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyArqF4aDQaOufLPzWSN9_iN6Cm4JTRDKhE",
  authDomain: "copy-right-953d7.firebaseapp.com",
  databaseURL: "https://copy-right-953d7-default-rtdb.firebaseio.com",
  projectId: "copy-right-953d7",
  storageBucket: "copy-right-953d7.appspot.com",
  messagingSenderId: "605094676657",
  appId: "1:605094676657:web:62b15a0d4597004527ba90",
  measurementId: "G-5KHGCC8VJ6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.alert(error);
    });
};
const database = getDatabase(app);
  
export default database;