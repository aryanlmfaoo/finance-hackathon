import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai';
import { z } from 'zod';
import { schedule } from 'node-cron'
import '../database/firebase'
import { getFirestore } from 'firebase-admin/firestore';

const moduleQuizSchema = z.array(
    z.object({
        question: z.string().describe("The quiz question"),
        options: z.array(
            z.string().describe("Quiz option text")
        ).min(2).max(2),
        indexOfCorrectAnswer: z.number().int().min(0).max(1),
        explanation: z.string().describe("Explanation for the correct answer")
    })
)
