import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai';
import { z } from 'zod';
import { schedule } from 'node-cron'
import '../database/firebase'
import { getFirestore } from 'firebase-admin/firestore';



