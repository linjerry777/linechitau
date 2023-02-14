// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC_CcVS_KM30RKkiNMLIYKfCLqe753GdpE',
  authDomain: 'login-b4f58.firebaseapp.com',
  projectId: 'login-b4f58',
  storageBucket: 'login-b4f58.appspot.com',
  messagingSenderId: '895988851891',
  appId: '1:895988851891:web:66d82116b8444aaec83cc6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const googleauth = getAuth(app);

export const provide = new GoogleAuthProvider();