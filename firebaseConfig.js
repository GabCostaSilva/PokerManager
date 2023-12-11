import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "pokermanager-828c7.firebaseapp.com",
    projectId: "pokermanager-828c7",
    storageBucket: "pokermanager-828c7.appspot.com",
    messagingSenderId: "549402585413",
    appId: "1:549402585413:web:317bf961c6de33aa65b62c",
    measurementId: "G-52YCEKRV12"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
