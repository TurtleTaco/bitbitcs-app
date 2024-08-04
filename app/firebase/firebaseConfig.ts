import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, indexedDBLocalPersistence, initializeAuth } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';

const firebaseConfig = {
  apiKey: "AIzaSyBIra7E5U0H6TXIgC1wElXZJxes2yIQy4M",
  authDomain: "bitbitdive.firebaseapp.com",
  projectId: "bitbitdive",
  storageBucket: "bitbitdive.appspot.com",
  messagingSenderId: "812435349589",
  appId: "1:812435349589:web:8595d4365c69a26120b4dc",
  measurementId: "G-TGE2HK4NH0"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth
const initializeFirebaseAuth = async () => {
  if (Capacitor.isNativePlatform()) {
    return initializeAuth(app, {
      persistence: indexedDBLocalPersistence,
    });
  } else {
    return getAuth(app);
  }
};

export { app, initializeFirebaseAuth };