import express from 'express'

// controllers import
import auth from './controllers/auth';
import news from './controllers/news';
import quiz from "./controllers/quiz";

import 'dotenv/config' // remove when pushing to prod
import './database/firebase' // setup for firebase
import { redisconnect } from './database/redis'

import './cronjobs/getnews'
import './cronjobs/moduleschema'
import './cronjobs/getquiz'// update news every 24hrs using News API
import './cronjobs/modulecontent'
import './cronjobs/modulequestions'

const app = express()


redisconnect() // connect to Redis


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/auth', auth)
app.use('/news', news)
app.use('/quiz', quiz)

app.get('/', (req, res) => { res.status(200).json({ ding: "dong" }) })

app.listen(5000, () => {
    console.log(`Listening on port ${5000}`)
})