import '../database/firebase';
import { Router } from 'express';
import { getFirestore } from "firebase-admin/firestore";

const router = Router()
const db = getFirestore();

router.get('/', async (req, res) => {
    try {
        const newsRef = db.collection('news').doc('data');
        const doc = await newsRef.get();
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            return res.status(200).json({ success: true, data: doc.data() });
        }
    }
    catch (e) {
        if (e instanceof Error) {
            return res.status(500).json({ success: false, message: e });
        } else {
            return res.status(500).json({ success: false, message: `An unknown error occurred` });
        }
    }
})

export default router