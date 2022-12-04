import { initializeApp } from "firebase/app";
import {
      getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail,
    } from "firebase/auth";
import { getDatabase, ref, onValue, set, child, get, remove} from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBX_eAqZlFq6LjT3S0YbsNFATqDDSoHIpg",
  authDomain: "cris-auth.firebaseapp.com",
  databaseURL: "https://cris-auth-default-rtdb.firebaseio.com",
  projectId: "cris-auth",
  storageBucket: "cris-auth.appspot.com",
  messagingSenderId: "272270120696",
  appId: "1:272270120696:web:7986e716acfd1c58384d0d",
  measurementId: "G-75FNFX7THE"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);

// Firebase Autentication

const auth = getAuth()
const providerGoogle = new GoogleAuthProvider();


function onAuth(setUser, setUserData, postsIMG, setUserPostsIMG) {
  return onAuthStateChanged(auth, (user) => {
        if (user) {
              setUser(user)
              getData(setUserData, postsIMG, setUserPostsIMG)
        }else{
          setUser(null)
        }
  });
}

const signup = (email, password, navigate, setSuccess) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((result) => {
    navigate("/")
})
.catch((error) => {
  setSuccess(false)
});
  
};

const login = (email, password, navigate, setSuccess) => {
  signInWithEmailAndPassword(auth, email, password)
.then((result) => {
  navigate("/")
})
.catch((error) => {
setSuccess(false)
});
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


function logout ( setUser) {
  signOut(auth).then(function () {
    console.log("hello")
    setUser(null)
        // Sign-out successful.
  }).catch(function (error) {
        // An error happened.
  });
}

//firebase Realtime Database

const db = getDatabase(app);

function writeUserData (url, complemento, object) {
  console.log(object)
  set(ref(db, url + complemento), object )
  .then(()=> console.log("saved"))
  .catch(()=> console.log('repeat'))
}

function removeData () {
  remove(ref(db, '/cotizaciones/'))
  .then(()=>console.log('save'))
  .catch(()=>console.log('repeat'));

}
function removeDataPros () {
  remove(ref(db, '/prospectos/'))
  .then(()=>console.log('save'))
  .catch(()=>console.log('repeat'));

}


function getData(setUserData) {
 
  onValue(ref(db, '/'), (snapshot) => {
    if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          setUserData('');
        }
    
  });
}

async function removeDataItem (url, data, setUserData) {
  await remove(ref(db, url + data))
  getData(setUserData)
}


export {app, onAuth, login, signup, logout, loginWithGoogle, resetPassword, writeUserData, removeData, removeDataPros, removeDataItem  }