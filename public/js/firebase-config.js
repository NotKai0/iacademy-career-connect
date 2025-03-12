// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration (Make sure your API key is secure!)
const firebaseConfig = {
    apiKey: "AIzaSyAVOqVR613CFEQ85aKfxGwgglSZQcPjwns",
    authDomain: "iacademy-career-connect-fbdad.firebaseapp.com",
    projectId: "iacademy-career-connect-fbdad",
    storageBucket: "iacademy-career-connect-fbdad.appspot.com",  // ✅ Fixed this
    messagingSenderId: "356595308284",
    appId: "1:356595308284:web:9dc0db363c3b829e15a979",
    measurementId: "G-MJPR2G4FQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other files
export { auth, db };
