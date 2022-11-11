var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var knex = require('../db/knex');
var getGroups = require('../modules/wc18groups.js');

function Pools () {return knex('pools')}
function WorldCupEntries () {return knex('wc18bracket')}
function Users () {return knex('users')}
function Beers () {return knex('beers')}
function Blogposts () {return knex('blogposts')}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('index.html');
});

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

router.get('/beers', async (req, res, next) => {
  const beers = await Beers();
  res.json(beers);
});

router.post('/beers', async (req, res, next) => {
  const beer = await Beers().insert({
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
    description: req.body.description,
    updated_at: new Date(),
    created_at: new Date()
  }, '*');
  console.log(beer[0].name, ' has been added to the DB');
  res.json(beer[0]);
})

router.get('/beers/:beername', async (req, res) => {
  const beer = await Beers().where({beername: req.params.beername});
  res.json(beer);
})

router.put('/beers/:beername', async (req, res, next) => {
  const beer = await Beers().where({name: req.body.name}).update({
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
    description: req.body.description,
    updated_at: new Date()
  }, '*');
  console.log(beer[0].name, ' has been updated in DB');
  res.json(beer[0]);
})

router.delete('/beers', async (req, res, next) => {
  const beer = await Beers().where({name: req.body.name}).del();
  console.log(beer[0].name, ' has been deleted');
  res.json(beer[0]);
})

// END BEER ROUTES
// BEGIN ALA ROUTES

router.get('/retrievePools', function(req, res, next){
  Pools().where({open: true}).then(function(results){
    res.json(results);
  })
});

router.post('/poolRegister', async (req, res, next) => {
  console.log('req.body is ', req.body);
  const { user } = req.body;
  const { alias, name, season } = req.body.pool;
  
  const groups = getGroups.getGroups(season);
  const brackets = [{
    'picks': [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    'consOne': null,
    'consTwo': null
  }];

  try {
    const poolInsert = await WorldCupEntries().insert({
      username: user,
      groupSelections: groups,
      bracketSelections: brackets,
      season,
      modified: new Date(),
      created_at: new Date(),
    }, '*')
    console.log(poolInsert[0].username, ' has been registered for ', alias);
  } catch (e) {
    console.log(`error creating poolInsert for ${poolInsert[0].username} is ${e}`);
  }

  try {
    await Pools().where({alias}).increment('entrants', 1);
    console.log(`${alias} has been incremented by one user`);
  } catch (e) {
    console.log(`error incrementing ${alias} pool by one user is ${e}`);
  }

  res.json({
    user,
    pool: name,
    alias
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

router.get('/blogposts', async (req, res, next) => {
  const posts = await Blogposts();
  res.json(posts);
})

router.post('/blogposts', async (req, res, next) => {
  var tags = [];
  if (req.body.tagone) {tags.push(req.body.tagone)}
  if (req.body.tagtwo) {tags.push(req.body.tagtwo)}
  if (req.body.tagthree) {tags.push(req.body.tagthree)}

  const blogpost = await Blogposts().insert({
    title: req.body.title,
    titlestring: req.body.titlestring,
    author: req.body.author,
    tags: JSON.stringify(tags),
    image: req.body.image,
    imageCaption: req.body.imageCaption,
    post: req.body.post,
    date: new Date(),
    created_at: new Date(),
    updated_at: new Date()
  }, '*')
  console.log(blogpost[0].title, ' has been added to DB');
  res.json(blogpost);
})

router.get('/blogposts/:titlestring', async (req, res) => {
  const post = await Blogposts().where({titlestring: req.params.titlestring});
  res.json(post);
})

module.exports = router;
