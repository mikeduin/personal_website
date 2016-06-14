var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('index.html');
});


var mongoose = require('mongoose');
var Beer = mongoose.model('Beer');
var Blogpost = mongoose.model('Blogpost');

router.get('/beers', function(req, res, next) {
  Beer.find(function(err, beers) {
    if (err) { next(err); }

    res.json(beers);
  })
})

router.get('/blogposts', function(req, res, next) {
  Blogpost.find(function(err, blogposts) {
    if (err) { next(err); }

    res.json(blogposts);
  })
})

router.post('/beers', function(req, res, next) {
  var beer = new Beer(req.body)

  beer.save(function(err, beer) {
    if (err) { return next(err); }

    res.json(beer)
  })
})

router.post('/blogposts', function(req, res, next) {
  var blogpost = new Blogpost(req.body)

  blogpost.save(function(err, blogpost) {
    if (err) { return next(err); }

    res.json(blogpost)
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
    res.json(req.beer);
})


module.exports = router;
