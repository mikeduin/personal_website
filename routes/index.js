var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var knex = require('../db/knex');
var getGroups = require('../modules/wc18groups.js');

function Pools () {
  return knex('pools')
};

function WC18Bracket () {
  return knex('wc18bracket')
};

function Users () {
  return knex('users')
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('index.html');
});

var mongoose = require('mongoose');
var Beer = mongoose.model('Beer');
var Blogpost = mongoose.model('Blogpost');

// BEGIN BEER ROUTES

router.post('/fridgeRequest', function(req, res, next){
  var transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_PW
    }
  })

  var text = req.body.name + ' is requesting that you put ' + req.body.brewery + "'s "+ req.body.beer + ' in the fridge. Their ETA is ' + req.body.eta

  var mailOptions = {
    from: 'postmaster@mg.mikeduin.com',
    to: 'michael.s.duin@gmail.com',
    subject: 'Fridge Request!',
    text: text
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.json({yo: 'error'})
    } else {
      console.log('Message sent: ' + info.response);
      res.json({yo: info.response});
    };
  })
})

router.get('/beers', function(req, res, next) {
  Beer.find(function(err, beers) {
    if (err) { next(err); }

    res.json(beers);
  })
});

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
      console.log(beer.name + 'was updated in db')
    }
  )
})

router.delete('/beers', function (req, res, next) {
  console.log(req.body);
  Beer.findOneAndRemove({ name: req.body.name }, function(err, beer){
    if (err) {next(err)}

    res.json(beer);
    console.log('The beer was deleted from db')

  })
})

// END BEER ROUTES
// BEGIN ALA ROUTES

router.get('/retrievePools', function(req, res, next){
  Pools().where({open: true}).then(function(results){
    res.json(results);
  })
});

router.post('/poolRegister', function(req, res, next){
  var alias = req.body.pool.alias;
  var groups = getGroups.getGroups();
  var brackets = [{
    'picks': [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    'consOne': null,
    'consTwo': null
  }];

  knex(alias).insert({
    username: req.body.user,
    groupSelections: groups,
    bracketSelections: brackets,
    modified: new Date()
  }, '*').then(function(ret){
    console.log(ret[0].username, ' has been registered for ', alias);
    knex.raw("UPDATE users SET " + alias + " = 1 WHERE username = '" + req.body.user + "'")
    .then(function(result){
      knex.raw("UPDATE pools SET entrants = entrants + 1 WHERE alias = '" + alias + "'")
      .then(function(){
        console.log("entrants for ", alias, " have been incremented");
        return res.json({
          user: req.body.user,
          pool: req.body.pool.name,
          alias: req.body.pool.alias
        })
      })
    })
  })
})


router.get('/user/:username', function (req, res, next){
  var user = req.params.username;
  Users().where({username: user}).select('*').then(function(data){
    res.json(data);
  })
})

router.post('/contactCommish', function(req, res, next){
  var transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_PW
    }
  })

  var html = '<b>Name:</b> ' + req.body.name + '<br><b>Email:</b> ' + req.body.email + '<br><b>Text:</b> ' + req.body.text + ''

  var mailOptions = {
    from: 'postmaster@mg.mikeduin.com',
    to: 'michael.s.duin@gmail.com',
    subject: 'Email from ALA Contact Form',
    html: html
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.json({yo: 'error'})
    } else {
      console.log('Message sent: ' + info.response);
      res.json({yo: info.response});
    };
  })
})

router.get('/blogposts', function(req, res, next) {
  Blogpost.find(function(err, blogposts) {
    if (err) { next(err); }

    res.json(blogposts);
  })
})

router.post('/blogposts', function(req, res, next) {
  var tags = [];
  tags.push(req.body.tagone);
  tags.push(req.body.tagtwo);
  tags.push(req.body.tagthree);

  var blogpost = Blogpost({
    title: req.body.title,
    titlestring: req.body.titlestring,
    author: req.body.author,
    tags: tags,
    image: req.body.image,
    imageCaption: req.body.imageCaption,
    post: req.body.post
  });

  blogpost.save(function(err, blogpost) {
    if (err) { return next(err); }

    res.json(blogpost)
  })
})

router.param('titlestring', function(req, res, next, titlestring) {
  var query = Blogpost.find({ titlestring: titlestring });

  query.exec(function (err, post) {
    if (err) {return next(err); }
    if (!post) {return next(new Error("can't find post")); }

    req.post = post;
    return next();
  })
})

router.get('/blogposts/:titlestring', function(req, res) {
    res.json(req.post);
})

module.exports = router;
