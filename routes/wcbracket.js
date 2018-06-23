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

function Results() {
  return knex('results')
};

var statsCompiled = false;

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

router.get('/teamstats', function(req, res, next){
  TeamStats().then(function(data){
    res.json(data);
  })
})

router.get('/results', function(req, res, next){
  Results().then(function(data){
    res.json(data);
  })
})

router.get('/flags', function(req, res, next){
  TeamStats().select('team', 'flag').then(function(flags){
    var lookup = {};
    flags.forEach(function(obj){
      lookup[obj.team] = obj.flag
    });
    res.json(lookup);
  })
})

router.get('/calcGroups', function(req, res, next){
  TeamStats().pluck('team').then(function(teams){
    Promise.all(teams.map(function(team){
      return Results().where({away_team: team}).then(function(results){
        var points = 0;
        var goals = 0;
        var win = 0;
        var loss = 0;
        var draw = 0;

        results.forEach(function(result){
          if (result.final == true) {
            points += result.away_points;
            goals += result.away_goals;
            if (result.away_points === 3) {
              win++;
            } else if (result.away_points === 1) {
              draw++;
            } else {
              loss++
            };
          };
        });

        return {team: team, away_points: points, away_goals: goals, away_wins: win, away_loss: loss, away_draw: draw}

      })
    })).then(function(teamArray){
      Promise.all(teamArray.map(function(team){
        var totalGoals = team.away_goals;
        var totalPoints = team.away_points;
        var totalWins = team.away_wins;
        var totalLoss = team.away_loss;
        var totalDraw = team.away_draw;
        var team = team.team
        var gp = 0;

        return Results().where({home_team: team}).then(function(homeResults){

          homeResults.forEach(function(homeResult){
            if (homeResult.final == true) {
              totalPoints += homeResult.home_points;
              totalGoals += homeResult.home_goals;
              if (homeResult.home_points === 3) {
                totalWins++;
              } else if (homeResult.home_points === 1) {
                totalDraw++;
              } else {
                totalLoss++
              };
            }
          });

          gp = totalWins + totalLoss + totalDraw;

          return {team: team, points: totalPoints, goals: totalGoals, gp: gp, totalWins: totalWins, totalLoss: totalLoss, totalDraw: totalDraw}

        })
      })).then(function(totalResults){
        totalResults.forEach(function(groupObj){
          TeamStats().where({team: groupObj.team}).update({
            group_pts: groupObj.points,
            group_gp: groupObj.gp,
            group_w: groupObj.totalWins,
            group_l: groupObj.totalLoss,
            group_d: groupObj.totalDraw,
            group_goals: groupObj.goals
          }, '*').then(function(res){
            console.log(res[0].team, ' has been updated');
          })
        })
      })
    })
  })
})

// router.get('/compileStats', function(req, res, next){
var compileFunction = function() {
  if (!statsCompiled) {
    TeamStats().then(function(teams){
      WC18Bracket().then(function(users){
        for (var i=0; i<teams.length; i++) {
          var group_1st = 0;
          var group_2nd = 0;
          var group_3rd = 0;
          var group_4th = 0;
          var round_8 = 0;
          var round_4 = 0;
          var round_2 = 0;
          var cons_winner = 0;
          var champion = 0;
          var team = teams[i].team;
          var group = teams[i].group;
          for (var j=0; j<users.length; j++) {
            if (users[j].groupSelections[0].groups[group][0] == team) {
              group_1st++;
            } else if (users[j].groupSelections[0].groups[group][1] == team) {
              group_2nd++;
            } else if (users[j].groupSelections[0].groups[group][2] == team) {
              group_3rd++;
            } else if (users[j].groupSelections[0].groups[group][3] == team) {
              group_4th++;
            };
            var bracketPicks = users[j].bracketSelections[0].picks;
            for (var k=0; k<bracketPicks.length; k++) {
              if (k<8 && bracketPicks[k] == team) {
                round_8++;
              };
              if (k > 7 && k < 12 && bracketPicks[k] == team) {
                round_4++;
              };
              if (k > 11 && k < 14 && bracketPicks[k] == team) {
                round_2++;
              };
              if (k == 14 && bracketPicks[k] == team) {
                cons_winner++;
              };
              if (k == 15 && bracketPicks[k] == team) {
                champion++;
              };
            }
          };
          var round_16 = group_1st + group_2nd;
          TeamStats().where({team: team}).update({
            group_1st: group_1st,
            group_2nd: group_2nd,
            group_3rd: group_3rd,
            group_4th: group_4th,
            round_16: round_16,
            round_8: round_8,
            round_4: round_4,
            round_2: round_2,
            cons_winner: cons_winner,
            champion: champion
          }, '*').then(function(returned){
            console.log('team stats updated for ', returned[0]);
          })
        }
      })
    })
  }
}

// setTimeout(compileFunction, 3000);


module.exports = router;
