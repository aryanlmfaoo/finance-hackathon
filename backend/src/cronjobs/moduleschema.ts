import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai';
import { z } from 'zod';
import { schedule } from 'node-cron'
import '../database/firebase'
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore()

const ai = genkit({
    plugins: [googleAI()],
    model: gemini15Flash,
});

const moduleSchema = z.array(
    z.object({
        title: z.string().describe("The title of the module"),
        description: z.string().describe("The description of the module")
    })
).min(20)

// update the crontime as planned
schedule('15 13 * * *', async () => {

    const generateModuleSchema = async () => {
        const response = await ai.generate({
            prompt: `# Generate 10 Educational Module Metadata Entries
    
    **Generate 20 educational module metadata entries for a financial literacy and fraud awareness app designed for Indian users.**
    
    ## Context
    You are creating modules for a financial education app that serves diverse Indian communities across all ages, languages, and backgrounds. The content should be culturally relevant, practical, and accessible to everyone from students to seniors, urban to rural populations.
    
    ## Requirements
    - Generate exactly 20 modules
    - Each module must cover a different fundamental financial topic
    - Avoid any overlap between modules
    - Topics should range from basic concepts to fraud prevention
    - Tone should be friendly, helpful, and encouraging
    - Content should be relatable to Indian financial systems, practices, and challenges
    
    ## Output Format
    Return a JSON array with exactly this structure:
    [{
    "title": "Module title here",
    "description": "Detailed description explaining what users will learn and why it matters for their financial well-being"
    }]
    
    ## Guidelines for Titles
    - Keep titles under 60 characters
    - Use simple, clear language
    - Make them engaging and actionable
    - Include Indian context where relevant
    
    ## Guidelines for Descriptions
    - 80-150 words per description
    - Explain practical benefits and real-world applications
    - Reference Indian financial systems (UPI, bank accounts, SIP, etc.) where appropriate
    - Address common concerns and misconceptions
    - Use encouraging, non-intimidating language
    - Mention specific skills or knowledge users will gain
    
    ## Topic Diversity Requirements
    Ensure the 20 modules cover different areas such as: basic money management, digital payments, saving strategies, investment fundamentals, loan management, insurance, fraud prevention, or retirement planning. No two modules should overlap in their primary focus.
    
    **Generate the modules now.**
    `,

            output: {
                schema: moduleSchema
            },

        });

        return response
    }


    try {
        console.time('module generation call')
        const data = await generateModuleSchema()
        console.timeEnd('module generation call')
        const moduledatastring = data?.message?.content[0].text
        if (!moduledatastring) {
            console.log(`schema wasnt generated`)
            return
        }

        const moduledata = JSON.parse(moduledatastring)
        for (let i = 0; i < moduledata.length; i++) {
            const moduleRef = db.collection('moduleSchema').doc(`en-${i}`)
            const setData = await moduleRef.set({
                metaData: moduledata[i]
            })
            console.log(setData)
        }
    } catch (e) {
        console.error(e)
    }
})
