// fix to only store needed stuff in db

import { getFirestore } from 'firebase-admin/firestore';
import { schedule } from 'node-cron';
import axios from 'axios'

const db = getFirestore();

// update news every 24 hrs in db
schedule('40 8 * * *', async () => {
    console.log(`start`);

    interface storedata {
        "article_id": string,
        "title": string,
        "link": string,
        "keywords": string[],
        "creator": string[],
        "description": string,
        "content": string,
        "pubDate": string,
        "pubDateTZ": string,
        "image_url": string,
        "video_url": null,
        "source_id": string,
        "source_name": string,
        "source_priority": number,
        "source_url": string,
        "source_icon": string,
        "language": string,
        "country": string[]
        "category": string[]
        "sentiment": string,
        "sentiment_stats": string,
        "ai_tag": string,
        "ai_region": string,
        "ai_org": string,
        "ai_summary": string,
        "ai_content": string,
        "duplicate": false
    }

    interface APIResponse {
        status: string,
        totalResults: number,
        results: storedata[]
    }
    const languages = ['en', 'hi', 'pa', 'bn', 'gu', 'ml', 'mr', 'ta', 'te', 'ur']

    try {
        languages.forEach(async (src) => {

            const res = await axios.get(`https://newsdata.io/api/1/news?apikey=${process.env.NEWS_API_KEY}&language=${src}&q=(scam OR fraud) AND (money OR finance OR bank OR loan OR crypto OR investment)`)

            const data = res.data as APIResponse
            const articles = data.results as storedata[];
            console.log(articles)
            // Wrap the articles array in an object
            const dataToStore = {
                articles: articles,
            };

            const docRef = db.collection('news').doc(src);
            await docRef.set(dataToStore);
            console.log('Document written/updated:', docRef.path);
            console.log(`end`);
        })
    } catch (e) {
        console.error(e)
    }

});
