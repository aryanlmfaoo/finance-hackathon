// Firebase Setup
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../serviceaccountkey.json"
import type { ServiceAccount } from 'firebase-admin'

initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

const db = getFirestore();

export default { db }
