import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4nqN_gjzBrH065E7fx9MeO7sQhNwXSDE",
  authDomain: "gym-review-api-b7055.firebaseapp.com",
  projectId: "gym-review-api-b7055",
  storageBucket: "gym-review-api-b7055.firebasestorage.app",
  messagingSenderId: "752077178804",
  appId: "1:752077178804:web:f11c9504a10d5d074394e1",
  measurementId: "G-TVLMD3T5FT",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);