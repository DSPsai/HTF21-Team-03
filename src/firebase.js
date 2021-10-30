import firebase from 'firebase/compat/app';
import 'firebase//compat/firestore';
import { getStorage } from "firebase/storage";
// import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCvK-fkorIiElE45jMfyc--0pfHiRTHpKk",
    authDomain: "lost-and-found-578f2.firebaseapp.com",
    projectId: "lost-and-found-578f2",
    storageBucket: "lost-and-found-578f2.appspot.com",
    messagingSenderId: "96917146765",
    appId: "1:96917146765:web:9054495f2a24aab5f966c4"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp);
const db=firebase.firestore();
 export {firebaseApp,db,storage};
