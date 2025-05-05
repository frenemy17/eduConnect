import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
   apiKey: "AIzaSyD5H33bq6fi9ebjPinFExW5ZvcbfHN7cgc",
    authDomain: "major-project-b759b.firebaseapp.com",
    projectId: "major-project-b759b",
    storageBucket: "major-project-b759b.firebasestorage.app",
    messagingSenderId: "808982396352",
    appId: "1:808982396352:web:c39087e9471b424b589c25"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };