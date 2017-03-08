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

// three separate unique postgres calls
// I do one call and then push to an array if value is unique

router.post('/add', function(req, res, next){
  var opp_def = (req.body.opponents+1) - req.body.rank;
  var profit = req.body.prize - req.body.buyin;
  User_Results().insert({
    name: req.body.entrant,
    game: req.body.game,
    season: req.body.season,
    rank: req.body.rank,
    buyin: req.body.buyin,
    prize: req.body.prize,
    profit: profit,
    opponents: req.body.opponents,
    opponents_def: opp_def
  }).then(function(){
      res.json(req.body);
  })
})

module.exports = router;
