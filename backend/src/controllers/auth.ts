import '../database/firebase';
import { getAuth } from "firebase-admin/auth";
import { Router } from 'express';
import { getFirestore } from "firebase-admin/firestore";

const router = Router()
const auth = getAuth();
const db = getFirestore();

router.post('/signup', async (req, res) => {
    try {
        const { uid, name, age, photoURL, yearlyIncome } = req.body;
        if (!name || !age || !uid || !yearlyIncome) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
        const userRef = db.collection('users').doc(uid)
        const userRecord = await userRef.set({
            displayName: name,
            age: age,
            yearlyIncome: yearlyIncome
        })

        const docRef = db.collection('appdata').doc(uid);
        const userAppData = await docRef.set({
            xp: 0,
            modules: [],
            modulesCompleted: 0,
            modulesPending: 0,
        })

        const quizRef = db.collection('quizIndex').doc(uid)
        const quizRefData = await quizRef.set({
            quizIndex: 0,
        })

        return res.status(201).json({ success: true, data: userRecord, data2: userAppData, data3: quizRefData });
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({ success: false, message: err.message })
        } else {
            return res.status(400).json({ success: false, message: `An unknown error occurred:` })
        }
    }
})

router.delete('/deleteaccount', async (req, res) => {
    try {
        const { uid } = req.query
        if (!uid) {
            return res.status(400).json({ success: false, message: "Invalid query " })
        }
        const [deleteuser, deleteappdata, deletexp] = await Promise.all([db.collection('users').doc(String(uid)).delete(), db.collection('appdata').doc(String(uid)).delete(), db.collection('xp').doc(String(uid))])
        return res.status(200).json({ success: true, message: "account deleted" })
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ success: false, message: err.message })
        } else {
            return res.status(500).json({ success: false, message: `unknown error occured` })

        }
    }
})

export default router;
