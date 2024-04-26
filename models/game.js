const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    type: String,
    name: String,
    upvotes: Number,
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game
