var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('index.html');
});

var mongoose = require('mongoose');
var Beer = mongoose.model('Beer');
var Blogpost = mongoose.model('Blogpost');

// BEGIN BEER ROUTES

router.get('/beers', function(req, res, next) {
  Beer.find(function(err, beers) {
    if (err) { next(err); }

    res.json(beers);
  })
})

router.post('/beers', function(req, res, next) {
  var beer = Beer({
    name: req.body.name,
    beername: req.body.beername,
    brewery: req.body.brewery,
    style: req.body.style,
    abv: req.body.abv,
    quantity: req.body.quantity,
    cold: req.body.cold,
    image: req.body.image,
    price: req.body.price,
    size: req.body.size,
    ordered: req.body.ordered,
    description: req.body.description
  });

  beer.save(function(err, beer) {
    if (err) { return next(err); }

    res.json(beer);
    console.log('new beer has been added!')
  })
})

router.delete('/beers', function (req, rest, next) {
  console.log(req.body);
  Beer.findOneAndRemove({ name: req.body.name }, function(err, beer){
    if (err) {next(err)}

    console.log(beer + 'was deleted from db')

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

router.put('/beers/:beername', function(req, res, next){
  console.log(req.body);
  Beer.findOneAndUpdate({ name: req.body.name},
    {
      beername: req.body.beername,
      brewery: req.body.brewery,
      style: req.body.style,
      abv: req.body.abv,
      quantity: req.body.quantity,
      cold: req.body.cold,
      image: req.body.image,
      price: req.body.price,
      size: req.body.size,
      ordered: req.body.ordered,
      description: req.body.description
    },
    function(err, beer) {
      if (err) { next(err) };

      res.json(beer);
      console.log(beer + 'was updated in db')
    }
  )
})

// END BEER ROUTES
// BEGIN BLOG ROUTES

router.get('/blogposts', function(req, res, next) {
  Blogpost.find(function(err, blogposts) {
    if (err) { next(err); }

    res.json(blogposts);
  })
})

router.post('/blogposts', function(req, res, next) {
  var blogpost = new Blogpost(req.body)

  blogpost.save(function(err, blogpost) {
    if (err) { return next(err); }

    res.json(blogpost)
  })


})


module.exports = router;
