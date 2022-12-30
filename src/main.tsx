import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom"



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={'...loading'}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
)



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeQLLMGJnlYvpSO4Pp1EZtNpP6MAyexcM",
  authDomain: "vwitter-4eef5.firebaseapp.com",
  projectId: "vwitter-4eef5",
  storageBucket: "vwitter-4eef5.appspot.com",
  messagingSenderId: "1036735197864",
  appId: "1:1036735197864:web:05f5d2a6c9f3320ddac89d",
  measurementId: "G-6F41KRT0K4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
export const db = getFirestore(app)