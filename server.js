const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)


app.get('/', (req, res) => {
    res.render('index.ejs')
})


mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

app.listen(3000, () => {
    console.log('listening on port 3000...');
})
