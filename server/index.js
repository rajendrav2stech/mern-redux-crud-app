import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import userRouter from './router/users.js'
import posts from './router/posts.js'

const app = express()

dotenv.config({ path: './config.env' })
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
// app.use(express.json())
// app.use(express.urlencoded())
app.use(cors())


// All Post Route
app.use('/user', userRouter)
app.use('/posts', posts)

// PORT

app.get('/', (req, res) => {
    res.send('Hello wellcome to')
})

// Database Url
const DB = process.env.DATABASE
const PORT = process.env.PORT

// Database Connection
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connection Successful'))
    .catch((err) => console.log(err.message))

// Listener
app.listen(PORT, () => {
    console.log(`listening on localhost ${PORT}`)
})

