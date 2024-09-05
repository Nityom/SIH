import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Firebase config from Firebase console
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Correctly initialize Firestore
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const signInWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const signUpWithEmail = async (email, password, additionalData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Save additional data to Firestore
    if (additionalData) {
      const { firstName, lastName } = additionalData;
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        email,
        firstName,
        lastName,
        createdAt: new Date(),
      });
    }
    console.log("User signed up successfully!");
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up: ", error);
    throw error;
  }
};

export const saveFormData = async (formData) => {
  try {
    await addDoc(collection(db, "users"), formData);
    console.log("Form data successfully saved!");
  } catch (error) {
    console.error("Error saving form data: ", error);
  }
};

export { db, auth };
