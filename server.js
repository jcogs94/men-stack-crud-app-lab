const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const Game = require('./models/game.js')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/games', async (req, res) => {
    const allGames = await Game.find()
    res.render('./games/index.ejs', {
        games: allGames
    })
})

app.get('/games/new', async (req, res) => {
    res.render('./games/new.ejs')
})

app.post('/games', async (req, res) => {
    // res.send(req.body)
    res.redirect('/games')
})


mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

app.listen(3000, () => {
    console.log('listening on port 3000...');
})
