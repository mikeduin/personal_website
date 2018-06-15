var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function WC18Bracket () {
  return knex('wc18bracket')
};

function Users () {
  return knex('users')
};

function TeamStats() {
  return knex('team_stats')
};

router.get('/picks/:user', function(req, res, next){
  WC18Bracket().where({
    username: req.params.user
  }).then(function(picks){
    res.json(picks);
  })
})

router.put('/saveGroupPicks', function(req, res, next){
  var user = req.body.user;
  var picks = [req.body.picks];
  WC18Bracket().where({
    username: user
  }).update({
    groupSelections: picks
  }, '*').then(function(returned){
    res.json(returned[0].groupSelections[0].groups);
  })
})

router.put('/saveBracketPicks', function(req, res, next){
  var user = req.body.user;
  var picks = [{
    'picks': req.body.picks,
    'consOne': req.body.consOne,
    'consTwo': req.body.consTwo
  }];
  WC18Bracket().where({
    username: user
  }).update({
    bracketSelections: picks
  }, '*').then(function(returned){
    res.json(returned);
  })
})

router.get('/standings', function(req, res, next){
  WC18Bracket().then(function(data){
    res.json(data);
  })
})

router.get('/user/:username', function(req, res, next){
  var user = req.params.username;
  WC18Bracket().where('wc18bracket.username', user).innerJoin('users', 'users.username', 'wc18bracket.username')
  .then(function(data){
    res.json(data[0]);
  })
})

router.get('/usernames', function(req, res, next){
  WC18Bracket().pluck('username').then(function(data){
    res.json(data);
  })
})

// // router.get('/compileStats', function(req, res, next){
// var compileFunction = function() {
//   TeamStats().then(function(teams){
//     WC18Bracket().then(function(users){
//       for (var i=0; i<teams.length; i++) {
//         var group_first = 0;
//         var group_second = 0;
//         var group_third = 0;
//         var group_fourth = 0;
//         var round_eight = 0;
//         var round_four = 0;
//         var round_two = 0;
//         var cons_winner = 0;
//         var champ = 0;
//         for (var j=0; j<users.length; j++) {
//
//         }
//       }
//     })
//   })
// }
//
// setTimeout(compileFunction, 3000)

// })


module.exports = router;
