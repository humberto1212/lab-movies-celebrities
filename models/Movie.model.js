const mongoose = require('mongoose')
require('./Celebrity.model')

const MovieSchema = new mongoose.Schema({

    title: String,
    genre: String,
    plot: String,
    cast: [ {
        ref: 'celebrity',
        type: mongoose.Schema.Types.ObjectId
    } ]

})

const MoviesModel = mongoose.model('movie', MovieSchema)

module.exports = MoviesModel;