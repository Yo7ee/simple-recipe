// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBZ7kRX7IJmHlFCQ3dE8S2x7HG8NMWKppc",
	authDomain: "simple-recipe-for-you.firebaseapp.com",
	projectId: "simple-recipe-for-you",
	storageBucket: "simple-recipe-for-you.appspot.com",
	messagingSenderId: "495217085377",
	appId: "1:495217085377:web:b8eb3fad68deaf431a7d40",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Google login
const provider = new GoogleAuthProvider(app);

const db = getFirestore(app);

const storage = getStorage(app);

export { auth as default, db, storage, provider };
