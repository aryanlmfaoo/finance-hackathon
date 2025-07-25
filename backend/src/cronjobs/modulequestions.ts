import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai';
import { z } from 'zod';
import { schedule } from 'node-cron'
import '../database/firebase'
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore()

interface DataSchema {
    title: string,
    description: string,
    pages: {
        title: string,
        content: string,
    }[],
}

const ai = genkit({
    plugins: [googleAI()],
    model: gemini15Flash,
});


async function GetQuestions(indexStart: number, indexEnd: number) {
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
                const dbData = metaDataCall.data() as DataSchema
                console.log(dbData)
                const moduleQuizSchema = z.array(
                    z.array(
                        z.object({
                            question: z.string().describe("The quiz question"),
                            options: z.array(
                                z.string().describe("Quiz option text")
                            ).min(2).max(2),
                            indexOfCorrectAnswer: z.number().int().min(0).max(1),
                            explanation: z.string().describe("Explanation for the correct answer")
                        })
                    ).min(1).max(1)
                ).min(5).max(5)

                console.time(`Processing index ${index}`)
                const generateModuledata = await ai.generate({
                    prompt: `
                Here's your revised prompt with integrated info about the hackathon project:

                ---

                # Learning Module Quiz Generator for Finance Hackathon

                You are a quiz generator designed to create educational questions for a financial literacy app. This app helps users learn to identify financial scams and improve their financial awareness through interactive learning modules.

                ## Project Context

                This app is being developed for a **finance-focused bank**, with the goal of raising awareness about **financial scams, fraud prevention, and smart money habits**. Users go through short learning modules and are tested on each module's content to reinforce understanding. Your role is to generate quiz questions that solidify these key concepts and promote retention.

                ## Input
                * **Title**: The title of the learning module
                * **Content**: The main content/material of the learning module
                ${dbData.pages[index]}

                ## Task

                Generate a JSON array containing **exactly 5 quiz question** for each page, focused on **testing comprehension** of the core financial concepts in the module.

                ## Output Format

                Return a JSON array containing exactly one quiz object with the following structure:

                json
                {
                  "question": "Clear, specific question testing understanding of the module content",
                  "options": ["First answer option", "Second answer option"],
                  "indexOfCorrectAnswer": 0,
                  "explanation": "Clear explanation of why the correct answer is right and how it relates to the module content"
                }[]


                ## Guidelines

                1. **Contextual Relevance**: Questions must be grounded in **financial literacy**, **scam detection**, or **fraud prevention**, in line with the app's purpose.
                2. **Answer Options**: Exactly **2 clear options** (true/false, yes/no, or A/B type).
                3. **Correct Answer**: Use \`"indexOfCorrectAnswer": 0\` for the first option or \`1\` for the second.
                4. **Explanation**: Provide a short, **educational explanation** that reinforces the financial concept taught.
                5. **Difficulty**: Tailor the question to the **level of a beginner to intermediate user** in financial education.
                6. **Engagement**: Phrase questions in an **interactive, real-world tone** relevant to someone trying to avoid scams or learn money smarts.
                `,
                    output: {
                        schema: moduleQuizSchema
                    }
                })

                console.timeEnd(`Processing index ${index}`)
                const moduleQuestions = generateModuledata.output;

                // Store the data
                console.log(dbData)
                await metaDataRef.set({
                    MetaData: { description: dbData.description, title: dbData.title },
                    pages: dbData.pages,
                    moduleQuestions: JSON.stringify(moduleQuestions)
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

// change time as per requirement
schedule('20 13 * * *', () => {
    GetQuestions(0, 4)
})
schedule('20 13 * * *', () => {
    GetQuestions(5, 9)
})
schedule('20 13 * * *', () => {
    GetQuestions(10, 14)
})
schedule('20 13 * * *', () => {
    GetQuestions(14, 19)
})