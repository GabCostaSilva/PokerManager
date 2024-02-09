import {getApps, initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {connectAuthEmulator, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword} from "firebase/auth";
import {LogBox} from "react-native";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "AIzaSyCqlBK4umAOsnIObRnOSAEF7t3fqGn1Fdk",
    authDomain: "pokermanager-828c7.firebaseapp.com",
    projectId: "pokermanager-828c7",
    storageBucket: "pokermanager-828c7.appspot.com",
    messagingSenderId: "549402585413",
    appId: "1:549402585413:web:317bf961c6de33aa65b62c",
    measurementId: "G-52YCEKRV12",
};

// Editing this file with fast refresh will reinitialize the app on every refresh, let's not do that
if (!getApps().length) {
    initializeApp(firebaseConfig,);
}

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

export const auth = getAuth();
if (process.env.REACT_APP_NODE_ENV !== 'prod') {
    connectAuthEmulator(auth, "http://192.168.100.76:9099");
}
export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const recoverPassword = (email) => sendPasswordResetEmail(auth, email)
export const database = getFirestore();
