require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./db/connect')
const router = require('./routes/user')
const app = express()
app.use('/Api/User',router)
const port = process.env.port || 5000

const Start = async (req, res, next) => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
            console.log(`Example app listening on port ${port}!`))

    } catch (error) {
        console.log('error: ', error);

    }
}

Start()