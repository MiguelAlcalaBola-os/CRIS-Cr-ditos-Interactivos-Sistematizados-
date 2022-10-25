// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
      getAuth,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signOut,
      onAuthStateChanged,
      GoogleAuthProvider,
      signInWithPopup,
      sendPasswordResetEmail,
    } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBX_eAqZlFq6LjT3S0YbsNFATqDDSoHIpg",
  authDomain: "cris-auth.firebaseapp.com",
  projectId: "cris-auth",
  storageBucket: "cris-auth.appspot.com",
  messagingSenderId: "272270120696",
  appId: "1:272270120696:web:7986e716acfd1c58384d0d",
  measurementId: "G-75FNFX7THE"
};

// Initialize Firebase


export const app = initializeApp(firebaseConfig);

// Firebase Autentication

const auth = getAuth()
const providerGoogle = new GoogleAuthProvider();


function onAuth(setUser,navigate) {
  return onAuthStateChanged(auth, (user) => {
        if (user) {
              setUser(user)
        }
  });
}

const signup = (email, password, navigate) => {
  createUserWithEmailAndPassword(auth, email, password);
  navigate("/")
};

const login = (email, password, navigate) => {
  signInWithEmailAndPassword(auth, email, password);
  navigate("/")
};

function loginWithGoogle (navigate) {
  signInWithPopup(auth, providerGoogle)
        .then((result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;
              // ...
              navigate("/")
        }).catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.email;
              // The AuthCredential type that was used.
              const credential = GoogleAuthProvider.credentialFromError(error);
              // ...
        });
}

const resetPassword = async (email) => sendPasswordResetEmail(auth, email);


function logout (navigate, setUser) {
  auth.signOut().then(function () {
    setUser(null)
    navigate("/Login")
      
        // Sign-out successful.
  }).catch(function (error) {
        // An error happened.
  });
}


export {onAuth, login, signup, logout, loginWithGoogle, resetPassword }