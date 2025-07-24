import '../database/firebase';
import { Router } from 'express';
import { getFirestore } from "firebase-admin/firestore";
import { client } from "../database/redis";
import axios from 'axios';

const router = Router()
const db = getFirestore()

interface qntype {
    explanation: String,
    indexOfCorrectAnswer: Number,
    options: [String, String],
    question: String
}

interface APIresponse {
    "source-language": String,
    "source-text": String,
    "destination-language": String,
    "destination-text": String,
    "pronunciation": {
        "source-text-phonetic": String | null,
        "source-text-audio": String | null,
        "destination-text-audio": String | null
    },
    "translations": {
        "all-translations": null,
        "possible-translations": String[],
        "possible-mistakes": null
    },
    "definitions": null,
    "see-also": null
}

router.get('/qn', async (req, res) => {
    try {
        const { uid, language } = req.query
        let translationExistsInRedis = false

        if (!uid) {
            return res.status(401).send('No token provided');
        }

        const totalqns = await client.get(`qns`)

        if (!totalqns) {
            return res.status(500).json({ success: false, message: "Please try again later" })
        }

        const [indexRef, xpRef] = await Promise.all([db.collection('quizIndex').doc(String(uid)).get(), db.collection('appdata').doc(String(uid)).get()])
        const quizIndex = indexRef.get('quizIndex')
        const xp = xpRef.get('xp')

        if (Number(quizIndex) > Number(totalqns)) {
            return res.status(400).json({ success: false, message: "Did all qns for today" })
        }

        let qn;
        if (language) {
            const languageQuestionCall = await client.get(`${language}:${quizIndex}`)
            if (languageQuestionCall) {
                qn = JSON.parse(languageQuestionCall)
                translationExistsInRedis = true
            } else {
                const originalQuestionCall = await client.get(`index:${quizIndex}`)
                if (!originalQuestionCall) return res.status(500).json({ success: false, message: "Server Error, cant find question" })
                qn = JSON.parse(originalQuestionCall)
                translationExistsInRedis = false
                translationExistsInRedis = false
            }
        } else {
            const languageQuestionCall = await client.get(`index:${quizIndex}`)
            if (!languageQuestionCall) return res.status(500).json({ success: false, message: "Server Error, cant find question" })
            qn = JSON.parse(languageQuestionCall)
        }

        const qnparsed = qn as qntype

        if (language && !translationExistsInRedis) {
            const [translatedExplanationCall, translatedoption1Call, translatedoption2Call, translatedQnCall] = await Promise.all([axios.get(`https://ftapi.pythonanywhere.com/translate?sl=en&dl=${language}&text=${qnparsed.explanation}`), axios.get(`https://ftapi.pythonanywhere.com/translate?sl=en&dl=${language}&text=${qnparsed.options[0]}`), axios.get(`https://ftapi.pythonanywhere.com/translate?sl=en&dl=${language}&text=${qnparsed.options[1]}`), axios.get(`https://ftapi.pythonanywhere.com/translate?sl=en&dl=${language}&text=${qnparsed.question}`)])

            const translatedExplanationData = translatedExplanationCall.data as APIresponse
            const translatedoption1Data = translatedoption1Call.data as APIresponse
            const translatedoption2Data = translatedoption2Call.data as APIresponse
            const translatedQnData = translatedQnCall.data as APIresponse

            const translatedExplanation = translatedExplanationData["destination-text"]
            const translatedoption1 = translatedoption1Data["destination-text"]
            const translatedoption2 = translatedoption2Data[`destination-text`]
            const translatedQn = translatedQnData["destination-text"]

            console.log(translatedExplanation)
            console.log(translatedoption1)
            console.log(translatedoption2)
            console.log(translatedQn)

            const answer = {
                explanation: translatedExplanation,
                indexOfCorrectAnswer: qnparsed.indexOfCorrectAnswer,
                options: [translatedoption1, translatedoption2],
                question: translatedQn
            }

            const rediswrite = await client.set(`${language}:${quizIndex}`, JSON.stringify(answer))
            console.log(rediswrite)
            return res.status(200).json({
                success: true,
                index: quizIndex,
                xp: xp,
                qn: answer
            })

        }
        return res.json({ success: true, index: quizIndex, xp: xp, qn: qnparsed })
    }
    catch (e) {
        if (e instanceof Error) {
            return res.status(500).json({ success: false, message: e.message });
        } else {
            return res.status(500).json({ success: false, message: `An unknown error occurred` });
        }
    }
});

router.put('/updateindex', async (req, res) => {
    try {
        const { uid, newindex } = req.query
        if (!uid || !newindex || isNaN(Number(newindex))) {
            return res.status(400).json({ success: false, message: "Invalid query" })
        }

        const indexRef = db.collection('quizIndex').doc(String(uid))
        const updateCall = await indexRef.update({ quizIndex: newindex })
        res.status(201).json({ success: true, data: updateCall })
    } catch (e) {
        if (e instanceof Error) {
            return res.status(500).json({ success: false, message: e.message });
        } else {
            return res.status(500).json({ success: false, message: `An unknown error occurred` });
        }
    }
})

export default router;