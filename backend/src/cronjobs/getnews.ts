import { getFirestore } from 'firebase-admin/firestore';
import { schedule } from 'node-cron';
import axios from 'axios'

const db = getFirestore();

// update news every 24 hrs in db
schedule('0 0 * * *', async () => {
    console.log(`start`);

    const res =  await axios.get(`https://newsapi.org/v2/everything?q=scam AND (money OR finance)&apiKey=${process.env.NEWS_API_KEY}`);
    const data = res.data
    const docRef = db.collection('news').doc('data');
    await docRef.set(data);

    console.log('Document written/updated:', docRef.path);
    console.log(`end`);
});
