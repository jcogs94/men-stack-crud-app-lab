const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const Game = require('./models/game.js')

app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/games/:gameId', async (req, res) => {
    const foundGame = await Game.findById(req.params.gameId)
    res.render('./games/show.ejs', {
        game: foundGame
    })
})

app.get('/games', async (req, res) => {
    const allGames = await Game.find()

    let types = {}
    allGames.forEach( (game) => {
        if (types[game.type] === undefined) {
            types[game.type] = []
        }
        
        types[game.type].push(game)
    })

    res.render('./games/index.ejs', {
        typesOfGames: types,
        typeKeys: Object.keys(types)
    })
})

app.get('/games/new', async (req, res) => {
    res.render('./games/new.ejs')
})

app.post('/games', async (req, res) => {
    const newGame = req.body
    newGame.upvotes = 1

    await Game.create(newGame)
    res.redirect('/games')
})


mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

app.listen(3000, () => {
    console.log('listening on port 3000...');
})
