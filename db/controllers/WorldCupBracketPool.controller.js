var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function WC18Bracket () {return knex('wc18bracket')};
function Users () {return knex('users')};
function TeamStats() {return knex('team_stats')};
function Results() {return knex('results')};
