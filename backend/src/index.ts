import express from 'express'

const app = express()

app.listen(5000, () => {
    console.log(`Listening on port ${5000}`)
})