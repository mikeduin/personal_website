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

router.param('beername', function(req, res, next, beername) {
  var query = Beer.find({ beername: beername });

  query.exec(function (err, beer) {
    if (err) {return next(err); }
    if (!beer) {return next(new Error("can't find beer")); }

    req.beer = beer;
    return next();
  })
})

router.get('/beers/:beername', function(req, res) {
  // Beer.find({ beername: '575666d3c4c18f0aba2496e0' }, function(err, beer) {
  //   if (err) { next(err); }
    res.json(req.beer);
})


module.exports = router;
