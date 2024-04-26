const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    type: String,
    name: String,
    lastPlayed: String
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game
