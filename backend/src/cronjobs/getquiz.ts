import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai';
import { z } from 'zod';
import { schedule } from "node-cron";
import { client } from "../database/redis";
import { writeFileSync } from 'fs'

const ai = genkit({
    plugins: [googleAI()],
    model: gemini15Flash, // Proper model reference
});

console.log(`page runs`)
export interface QuizQuestion {
    question: string;
    options: [string, string]; // exactly 3 options
    indexOfCorrectAnswer: 0 | 1;
    explanation: string;
    xpGain: number;
    xpLoss: number;
}

schedule('0 0 * * *', async () => {
    console.log(`start`)

    const d = new Date();
    let day = d.getDay();

    const weeklyThemes = [
        "Safety Sunday - Digital resilience, secure practices, and financial confidence building",
        "Monday Mindset - Building financial awareness and security consciousness",
        "Trap Tuesday - Identifying phishing, OTP scams, and fraud tactics",
        "Wisdom Wednesday - Personal finance basics, budgeting, and smart money habits",
        "Threat Thursday - Digital banking risks, identity theft, and online safety",
        "Fraud Friday - Advanced scam techniques and prevention strategies",
        "Scam Saturday - Weekend fraud alerts and social engineering awareness",
    ];

    const QuestionSchema = z.object({
        question: z.string().describe('The quiz question being asked.'),
        options: z.array(z.string())
            .min(2)
            .max(2)
            .describe('Exactly 2 multiple choice options for the question.'),
        indexOfCorrectAnswer: z.number()
            .int()
            .min(0)
            .max(1)
            .describe('Index of the correct answer from options (0 or 1).'),
        explanation: z.string()
            .min(10)
            .describe('Clear explanation of why the correct answer is right.'),
        // xpGain: z.number()
        //     .int()
        //     .min(1)
        //     .describe('XP points awarded when the user selects the correct answer.'),
        // xpLoss: z.number()
        //     .int()
        //     .min(0)
        //     .describe('XP points deducted when the user selects an incorrect answer.')
    });

    // Array of questions schema
    const QuizQuestionsArray = z.array(QuestionSchema)
        .min(1)
        .describe('Array of quiz questions for the specified theme.');

    // Enhanced prompt with better instructions
    const generateQuiz = async (quiz: string) => {
        const response = await ai.generate({
            prompt: `You are an expert quiz creator specializing in financial literacy education for Indian audiences. Create 100 multiple-choice questions on "${quiz}" with exactly 2 options each.
## Quality Requirements:
- Focus on scenario-based questions that test understanding and application, not memorization
- Include realistic situations relevant to Indian context (Indian banks, payment systems, common scams)
- Mix difficulty levels: 30% basic, 50% intermediate, 20% advanced
- Ensure all options are plausible - avoid obviously wrong answers
- Make incorrect options represent common misconceptions or mistakes
- Use clear, simple language appropriate for diverse age groups and education levels

## Content Guidelines:
- Reference Indian financial institutions, payment methods (UPI, NEFT, etc.), and regulations where relevant
- Include practical scenarios (family budgeting, festival expenses, online shopping safety)
- Address both urban and rural financial situations
- Cover fraud prevention with specific examples of common Indian scams (fake loan apps, OTP fraud, etc.)

# Return a JSON object with exactly these keys:
Example:
{
  "question": string,
  "options": [string, string],
  "indexOfCorrectAnswer": 0 or 1,
  "explanation": string
}
`,

            output: {
                schema: QuizQuestionsArray
            },
        });
        return response;
    };

    try {
        await client.flushDb()
        console.log(`calling google`)
        const quiz = await generateQuiz(weeklyThemes[day]);
        if (quiz.message === undefined) return
        if (quiz.message.content[0].text === undefined) return
        const data = JSON.parse(quiz.message.content[0].text) as QuizQuestion[]
        client.set(`qns`, JSON.stringify(data.length))
        writeFileSync(__dirname + '/example.json', JSON.stringify(data))

        data.forEach(async (src, index) => {
            await client.set(`index:${index}`, JSON.stringify(src));
            console.log(`saved qn ${src} with index ${index}`);
        })

    } catch (error) {
        console.error('Quiz generation failed:', error);
    }
})