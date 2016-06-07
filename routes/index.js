var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('index.html');
});

var mongoose = require('mongoose');
var Beer = mongoose.model('Beer');

router.get('/beers', function(req, res, next) {
  Beer.find(function(err, beers) {
    if (err) { next(err); }

    res.json(beers);
  })
})

router.post('/beers', function(req, res, next) {
  var beer = new Beer(req.body)

  beer.save(function(err, beer) {
    if (err) { return next(err); }

    res.json(beer)
  })
})

router.param('post', function(req, res, next, id) {
  var query = Beer.findById(id);

  query.exec(function (err, post) {
    if (err) {return next(err); }
    if (!beer) {return next(new Error("can't find beer")); }

    req.beer = beer;
    return next();
  })
})

router.get('/beers/:beer', function(req, res) {
  res.json(req.beer);
})


module.exports = router;
