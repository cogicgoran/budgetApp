import { FirebaseOptions, initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider,connectAuthEmulator } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig:FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function getAuthService(){
  if(process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATORS === "on"){
    const auth = getAuth();
    connectAuthEmulator(auth, "http://localhost:9099",{
      disableWarnings: true
    });
    return auth;
  }
  return getAuth(app);
}

export const firebaseAuthService = getAuthService();

export async function signUp(email: string, password: string) {
  return createUserWithEmailAndPassword(firebaseAuthService, email, password);
}

export async function signInWithGoogle() {
  return signInWithPopup(firebaseAuthService, new GoogleAuthProvider());
}

export async function signInWithFacebook() {
  return signInWithPopup(firebaseAuthService, new FacebookAuthProvider());
}

export async function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(firebaseAuthService, email, password);
}

export async function logOut() {
  return signOut(firebaseAuthService);
}

export default app;