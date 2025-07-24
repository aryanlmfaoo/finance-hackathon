import { genkit } from 'genkit';
import { googleAI, gemini25ProExp0325 } from '@genkit-ai/googleai';
import { z } from 'zod';
import { schedule } from 'node-cron'
import '../database/firebase'
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore()

const ai = genkit({
    plugins: [googleAI({ apiKey: process.env.GOOGLE_API_KEY2 })],
    model: gemini25ProExp0325,
});

const modulePageSchema = z.array(
    z.object({
        title: z.string().describe("The title of the page"),
        content: z.string().min(20)
    })
)

interface dbData {
    title: string,
    description: string,
}

schedule('20 19 * * *', async () => {
    const arrayRef = await db.collection('moduleSchema').doc('en').get()
    const MetadataArray = arrayRef.get('data') as dbData[]

    MetadataArray.forEach((src) => {

    })



})