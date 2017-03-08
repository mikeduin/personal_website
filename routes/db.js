var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function User_Results () {
  return knex('user_results')
};

router.get('/entrants', function(req, res, next){
  User_Results().distinct('name').select().then(function(results){
    var sorted = results.sort(function(a, b){
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
    res.json(sorted);
  })
})

// THIS FUNCTION BELOW ADMITTEDLY REALLY, TOTALLY SUCKS WITH SIX DIFFERENT POTENTIAL CALLS. BUT HOW DO I SET 'ALL' VALUES DYNAMICALLY IF A FILTER IS NOT SELECTED?

router.get('/query/:entrant/:game/:year', function(req, res, next){
  var entrant, game, year;
  if (req.params.entrant === '*' && req.params.game === '*' && req.params.year !== '*') {
    User_Results().where({
      season: req.params.year
    }).then(function(results){
      res.json(results);
    })
  } else if (req.params.entrant !== '*' && req.params.game === '*' && req.params.year === '*') {
    User_Results().where({
      name: req.params.entrant
    }).then(function(results){
      res.json(results);
    })
  } else if (req.params.entrant === '*' && req.params.game !== '*' && req.params.year === '*') {
    User_Results().where({
      game: req.params.game
    }).then(function(results){
      res.json(results);
    })
  } else if (req.params.entrant !== '*' && req.params.game !== '*' && req.params.year === '*') {
    User_Results().where({
      name: req.params.entrant,
      game: req.params.game
    }).then(function(results){
      res.json(results);
    })
  } else if (req.params.entrant !== '*' && req.params.game === '*' && req.params.year !== '*') {
    User_Results().where({
      name: req.params.entrant,
      season: req.params.year
    }).then(function(results){
      res.json(results);
    })
  } else if (req.params.entrant === '*' && req.params.game !== '*' && req.params.year !== '*') {
    User_Results().where({
      game: req.params.game,
      season: req.params.year
    }).then(function(results){
      res.json(results);
    })
  } else if (req.params.entrant !== '*' && req.params.game !== '*' && req.params.year !== '*') {
    User_Results().where({
      name: req.params.entrant,
      game: req.params.game,
      season: req.params.year
    }).then(function(results){
      res.json(results);
    })
  }
})

// three separate unique postgres calls
// I do one call and then push to an array if value is unique

router.post('/add', function(req, res, next){
  var opp_def = (req.body.opponents+1) - req.body.rank;
  var profit = req.body.prize - req.body.buyin;
  var opponents = req.body.opponents;
  isNaN(profit) ? profit=0 : profit=profit;
  isNaN(opp_def) ? opp_def=0 : opp_def=opp_def;
  opponents === null? opponents=0 : opponents=opponents;
  User_Results().insert({
    name: req.body.entrant,
    game: req.body.game,
    season: req.body.season,
    rank: req.body.rank,
    buyin: req.body.buyin,
    prize: req.body.prize,
    profit: profit,
    opponents: opponents,
    opponents_def: opp_def
  }).then(function(){
      res.json(req.body);
  })
})

module.exports = router;
