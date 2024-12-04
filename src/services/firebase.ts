import { Pin } from "@/types/Pin.types";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  CollectionReference,
  DocumentData,
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

export const pinCol = createCollection<Pin>("pin");

export default app;
