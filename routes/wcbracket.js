var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function WC18Bracket () {
  return knex('wc18bracket')
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
    var picks = returned[0].groupSelections[0].groups;
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
    var picks = returned[0].bracketSelections;
  })
})

module.exports = router;