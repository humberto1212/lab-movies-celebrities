// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CeleModel = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    CeleModel.create([ {name, occupation, catchPhrase} ])
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(() => {
            res.render('celebrities/new-celebrity')
        })


})

router.get('/celebrities', (req,res, next) => {
    CeleModel.find()
        .then((celebrities) => {
            res.render('celebrities/celebrities.hbs', {celebrities})
        })
        .catch(() => {
            next('failed celebrities render')
        })
})

module.exports = router;