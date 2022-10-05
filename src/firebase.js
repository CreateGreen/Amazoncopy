
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCEv-x0ZlwQwi_T1T16bUtOQjd6v-U210I",
    authDomain: "clone-9abe1.firebaseapp.com",
    projectId: "clone-9abe1",
    storageBucket: "clone-9abe1.appspot.com",
    messagingSenderId: "606328461452",
    appId: "1:606328461452:web:27458215b36951eb4343a9"
  };
  

const firebaseApp= firebase.initializeApp(firebaseConfig);
const db =firebase.firestore(firebaseApp);
const authservice = firebase.auth();

export {db,authservice};