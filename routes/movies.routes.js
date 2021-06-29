// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

MovieModel = require('../models/Movie.model.js')
CeleModel = require('../models/Celebrity.model')

router.get('/movies/create', (req, res, next) => {

    CeleModel.find()
        .then((celebrities) => {
            res.render('movies/new-movie.hbs', {celebrities})
        })
        .catch(() => {
            next('create movie failed')
        }) 
})

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    MovieModel.create([{ title, genre, plot, cast }])
        .then(() => {
            res.redirect('/movies')
        })
        .catch((err) => {
            next(err)
        })


})

router.get('/movies', (req, res, next) => {
    MovieModel.find()
        .then((movies) => {
            res.render('movies/movies.hbs', {movies})
        })
        .catch((err) => {
            next(err)
        })
})

module.exports = router;