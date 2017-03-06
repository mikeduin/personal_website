var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function User_Results () {
  return knex('user_results')
};

router.post('/add', function(req, res, next){
  var opp_def = req.body.opponents - req.body.rank;
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
