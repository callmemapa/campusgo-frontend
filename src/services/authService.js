import axios from 'axios';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

const apiKey = import.meta.env.FIREBASE_API_KEY;
const authDomain = import.meta.env.FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

const app = initializeApp(firebaseConfig);

export const postUser = async (user) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/signup', user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error posting user: ', error);
        throw error;
    }
};

export const signIn = async (user) => {
    const auth = getAuth();
    console.log("auth", auth);
    console.log("email", user.email);
    console.log("password", user.password);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const loggedInUser = userCredential.user;
      const idToken = await loggedInUser.getIdToken();
      console.log(userCredential);
      // Envía el token de ID al backend
      const response = await fetch("http://localhost:3000/api/auth/verifyToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });
  
      const data = await response.json();
      console.log("data", data);
      if (data) {
        return idToken;
      }
    } catch (error) {
      console.error("Error signing in:", error.code, error.message);
    }
  };