// Firebase Setup
import { initializeApp, cert } from "firebase-admin/app";
import serviceAccount from "../serviceaccountkey.json"
import type { ServiceAccount } from 'firebase-admin'

initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

