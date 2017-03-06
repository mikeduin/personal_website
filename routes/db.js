var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function User_Entries () {
  return knex('user_entries')
};

router.post('/add', function(req, res, next){
  console.log(req.body);
  res.json(req.body);
})

module.exports = router;
