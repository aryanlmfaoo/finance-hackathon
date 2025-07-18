import express from 'express'

// controllers import
import auth from './controllers/auth';

import 'dotenv/config' // remove when pushing to prod
import './database/firebase' // setup for firebase
import './cronjobs/getnews' // update news every 24hrs using News API

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('./auth', auth)

app.listen(5000, () => {
    console.log(`Listening on port ${5000}`)
})