//const { populate } = require("../models/Celebrity.model");

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

router.get('/movies/:id', (req,res,next) => {
    let id = req.params.id

    MovieModel.findById(id)
        .populate('cast')
        .then((moviesDetail) => {
            res.render('movies/movie-details.hbs', {moviesDetail})
        })
        .catch((err) => {
            next(err)
        })
})

router.post('/movies/:id/delete', (req, res, next) => {
    let id = req.params.id

    MovieModel.findByIdAndRemove(id)
        .then(() => {
            res.redirect('/movies');
        })
        .catch((err) => {
            next(err);
        })
})

router.get('/movies/:id/edit', (req,res,next) => {
    let id = req.params.id

    MovieModel.findById(id)
        .then((selectecMovie) => {
           
            CeleModel.find({})
            .then((cele) => {
                res.render('movies/edit-movie.hbs', {cele, selectecMovie } )
            })
            .catch((err) => {
                next(err)
            })
        })
        .catch((err) => {
            next(err)
        })
})

router.post('/movies/:id/edit', (req,res,next) => {
    let id = req.params.id;
    const {title, genre, plot, cast} = req.body;

    MovieModel.findByIdAndUpdate(id, {title, genre, plot, cast})
    .then(() => {
        res.redirect('/movies')
    })
    .catch((err) => {
        next(err)
    })
})

module.exports = router;