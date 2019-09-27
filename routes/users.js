var express = require('express');
var router = express.Router();
var knex = require ('../db/knex');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var passport = require('passport');
require('dotenv').load();

function Users() {
  return knex('users');
}

function generateJWT (user) {
  // this function sets expiration of token to 1000 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate()+ 1000);

  //this function below takes two arguments - the payload that will be signed by the JWT + the secret. Hard-coding 'SECRET' for now but need to come back and change that to an environment variable so the secret is kept out of our code. This 'SECRET' reference is also included in the auth variable in index.js, so remember to change that too.
  return jwt.sign({
    _id: user[0]._id,
    username: user[0].username,
    email: user[0].email,
    nameFirst: user[0].nameFirst,
    nameLast: user[0].nameLast,
    exp: parseInt(exp.getTime() / 1000),
  }, process.env.SESSION_SECRET)
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  Users().then(function(users){
    res.json(users);
  })
});

router.get('/:username', function (req, res, next){
  Users().where({username: req.params.username}).then(function(user){
    res.json(user);
  })
})

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password || !req.body.nameFirst || !req.body.nameLast || !req.body.email
  ){
    return res.status(400).json({message: 'You left something blank!'});
  };

  var salt = crypto.randomBytes(16).toString('hex');
  var hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex');

  Users().where({username: req.body.username}).orWhere({email: req.body.email}).then(function(result){
    if (!result[0]) {
      Users().max('id').then(function(data){
        let increment = 0;
        increment = data[0].max + 1;

        Users().insert({
          id: increment,
          username: req.body.username,
          nameFirst: req.body.nameFirst,
          nameLast: req.body.nameLast,
          email: req.body.email,
          salt: salt,
          hash: hash,
          registered: new Date()
        }, '*').then(function(user){
          res.json({token: generateJWT(user)});
        })
      });
    } else {
      return res.status(400).json({message: "You've already registered with this email or username."})
    }
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'You forgot to include either your username or your password!'});
  };

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: generateJWT(user)});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
})

module.exports = router;
