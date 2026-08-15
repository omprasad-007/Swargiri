import admin from "firebase-admin";

let firebaseApp = null;

export function getFirebaseApp() {
  if (firebaseApp) return firebaseApp;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    console.warn("Firebase admin credentials are missing. Auth and database will be disabled.");
    return null;
  }

  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });

  return firebaseApp;
}

export function getFirebaseAuth() {
  const app = getFirebaseApp();
  if (!app) return null;
  return admin.auth(app);
}

export function getFirestore() {
  const app = getFirebaseApp();
  if (!app) return null;
  return admin.firestore(app);
}

export const serverTimestamp = () => admin.firestore.FieldValue.serverTimestamp();
