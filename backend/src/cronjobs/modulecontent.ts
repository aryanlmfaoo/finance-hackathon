import { genkit } from 'genkit';
import { googleAI, gemini15Pro, gemini20FlashLite, gemini10Pro, gemini15Flash } from '@genkit-ai/googleai';
import { z } from 'zod';
import { schedule } from 'node-cron'
import '../database/firebase'
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore()

const ai = genkit({
    plugins: [googleAI()],
    model: gemini15Flash,
});

interface metadata {
    title: string,
    description: string,

}

async function DBcall(indexStart: number, indexEnd: number) {
    try {
        // Process all indices in the range
        for (let index = indexStart; index <= indexEnd; index++) {
            try {
                const metaDataRef = db.collection('moduleSchema').doc(`en-${index}`)
                const metaDataCall = await metaDataRef.get()

                // Skip if document doesn't exist
                if (!metaDataCall.exists) {
                    console.log(`Document en-${index} does not exist, skipping...`)
                    continue
                }
                console.log(metaDataCall.data())
                const metaData = metaDataCall.data()?.metaData as metadata

                const modulePageSchema = z.array(
                    z.object({
                        title: z.string().describe("The title of the page"),
                        content: z.string().min(20).describe("The content of the module")
                    })
                )

                console.time(`Processing index ${index}`)
                const generateModuledata = await ai.generate({
                    prompt: `
# Financial Literacy Learning Module Content Generator
You are tasked with creating educational content for a government-backed financial literacy and fraud awareness app. Your target audience consists of first-time internet and banking users who need to learn basic money concepts, personal finance management, and scam awareness.

## Task Overview

Generate **5 content-rich pages** for a learning module based on the provided metadata. Each page should be educational, practical, and accessible to beginners.

## Module Information
- **Title:** ${metaData.title}
- **Description:** ${metaData.description}

## Content Requirements

### Structure
Create exactly **5 pages** that follow a logical learning progression:
1. **Introduction & Foundation** - Basic concepts and overview
2. **Core Concepts** - Essential knowledge and principles  
3. **Practical Applications** - Real-world examples and scenarios
4. **Common Pitfalls & Solutions** - What to avoid and how to handle problems
5. **Summary & Next Steps** - Key takeaways and actionable advice

### Page Content Guidelines

Each page must include:
- **Clear, descriptive title** (5-10 words)
- **Rich educational content** (50-70 words per page)
- **Simple language** appropriate for beginners
- **Practical examples** relevant to everyday financial situations

### Writing Style
- Use **conversational, friendly tone**
- Break down complex concepts into digestible chunks
- Include **real-world scenarios** and relatable examples
- Emphasize **safety and security** throughout
- Make content **culturally sensitive** and inclusive
`,
                    output: {
                        schema: modulePageSchema
                    }
                })

                console.timeEnd(`Processing index ${index}`)
                const modulePages = generateModuledata.output;

                // Store the data
                await metaDataRef.set({
                    description: metaData.description,
                    title: metaData.title,
                    pages: modulePages,
                })

                console.log(`Successfully processed and stored data for index ${index}`)

            } catch (innerError) {
                console.error(`Error processing index ${index}:`, innerError)
            }
        }

        console.log(`Batch processing complete for indices ${indexStart}-${indexEnd}`)

    } catch (e) {
        console.error(`Error in batch processing ${indexStart}-${indexEnd}:`, e)
    }
}

// Schedule 4 cron jobs for different batches
// update the cron times as required
schedule('20 4 * * *', () => {
    console.log('Starting batch 1: indices 0-4')
    DBcall(0, 4)
})

schedule('0 6 23 * *', () => {
    console.log('Starting batch 2: indices 5-9')
    DBcall(5, 9)
})

schedule('0 10 23 * *', () => {
    console.log('Starting batch 3: indices 10-14')
    DBcall(10, 14)
})

schedule('0 14 23 * *', () => {
    console.log('Starting batch 4: indices 15-19')
    DBcall(15, 19)
})
