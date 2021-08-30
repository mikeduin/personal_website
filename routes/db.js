var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function User_Results () {
  return knex('user_results')
};

function CareerData() {return knex('career_data')};

router.get('/careerData', async (req, res) => {
  const results = await CareerData();

  res.json(results);
})

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

// THIS FUNCTION BELOW ADMITTEDLY TOTALLY SUCKS WITH SEVEN DIFFERENT POTENTIAL CALLS. NEED TO REDUCE. BUT HOW DO I SET 'ALL' VALUES DYNAMICALLY IN A POSTGRES where() QUERY IF A FILTER IS NOT SELECTED?

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
      var userData = {};
      userData['entries'] = results.length;
      userData['uniqueGms'] = [];
      userData['titles'] = 0;
      userData['podiums'] = 0;
      userData['buyins'] = 0;
      userData['prizes'] = 0;
      userData['profits'] = 0;
      userData['debut'] = new Date().getFullYear();
      userData['active'] = results[0].season;
      userData['bigCash'] = 0;
      userData['bigCashGame'] = null;
      userData['bigCashYear'] = null;
      for (var i=0; i<results.length; i++) {
        if (userData['uniqueGms'].indexOf(results[i]) === -1) {
          userData['uniqueGms'].push(results[i])
        };
        if (results[i].rank !== null && results[i].rank < 2) {
          userData['titles']++;
        };
        if (results[i].rank !== null && results[i].rank < 4) {
          userData['podiums']++;
        };
        if (results[i].season < userData['debut']) {
          userData['debut'] = results[i].season;
        };
        if (results[i].season > userData['active']) {
          userData['active'] = results[i].season;
        };
        if (results[i].prize > userData['bigCash']) {
          userData['bigCash'] = results[i].prize;
          userData['bigCashGame'] = results[i].game;
          userData['bigCashYear'] = results[i].season;
        };
        userData['buyins'] += results[i].buyin;
        userData['prizes'] += results[i].prize;
        userData['profits'] += results[i].profit;
      };
      userData['ROI'] = userData['profits'] / userData['buyins'];
      userData['uniqueGmsTotal'] = userData['uniqueGms'].length;
      res.json({
        results: results,
        userData: userData
      });
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
