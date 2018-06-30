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

// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

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
        var goalsAg = 0;
        var win = 0;
        var loss = 0;
        var draw = 0;

        results.forEach(function(result){
          if (result.final == true) {
            points += result.away_points;
            goals += result.away_goals;
            goalsAg += result.home_goals;
            if (result.away_points === 3) {
              win++;
            } else if (result.away_points === 1) {
              draw++;
            } else {
              loss++
            };
          };
        });

        return {team: team, away_points: points, away_goals: goals, away_wins: win, away_loss: loss, away_draw: draw, goals_ag: goalsAg}

      })
    })).then(function(teamArray){
      Promise.all(teamArray.map(function(team){
        var totalGoals = team.away_goals;
        var totalPoints = team.away_points;
        var totalWins = team.away_wins;
        var totalLoss = team.away_loss;
        var totalDraw = team.away_draw;
        var totalGoalsAg = team.goals_ag;
        var team = team.team
        var gp = 0;

        return Results().where({home_team: team}).then(function(homeResults){

          homeResults.forEach(function(homeResult){
            if (homeResult.final == true) {
              totalPoints += homeResult.home_points;
              totalGoals += homeResult.home_goals;
              totalGoalsAg += homeResult.away_goals;
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
          goalDif = totalGoals - totalGoalsAg;

          return {team: team, points: totalPoints, goals: totalGoals, gp: gp, totalWins: totalWins, totalLoss: totalLoss, totalDraw: totalDraw, goalsAg: totalGoalsAg, goalDif: goalDif}

        })
      })).then(function(totalResults){
        totalResults.forEach(function(groupObj){
          TeamStats().where({team: groupObj.team}).update({
            group_pts: groupObj.points,
            group_gp: groupObj.gp,
            group_w: groupObj.totalWins,
            group_l: groupObj.totalLoss,
            group_d: groupObj.totalDraw,
            group_goals: groupObj.goals,
            group_goals_ag: groupObj.goalsAg,
            group_goal_dif: groupObj.goalDif
          }, '*').then(function(res){
            console.log(res[0].team, ' has been updated');
          })
        })
      })
    })
  })
})

router.get('/fetchStandings', function(req, res, next){
  TeamStats().pluck('team').orderBy('group').orderBy('group_pts', 'desc').orderBy('group_goal_dif', 'desc').orderBy('group_goals', 'desc').orderBy('group_tb', 'desc').then(function(ordered){
    var groupA = ordered.slice(0, 4);
    var groupB = ordered.slice(4, 8);
    var groupC = ordered.slice(8, 12);
    var groupD = ordered.slice(12, 16);
    var groupE = ordered.slice(16, 20);
    var groupF = ordered.slice(20, 24);
    var groupG = ordered.slice(24, 28);
    var groupH = ordered.slice(28, 32);

    var standingsObj = {
      "groups": {"A": groupA, "B": groupB, "C": groupC, "D": groupD, "E": groupE, "F": groupF, "G": groupG, "H": groupH}
    };

    res.json(standingsObj);
  })
})



router.get('/calcBrackets', function(req, res, next){
  // var calcBrackets = function(){
    Results().where({
      stage: 'bracket',
      final: true
    }).orderBy('matchtime').pluck('winner').then(function(winners){
      WC18Bracket().then(function(users){
        users.forEach(function(user){
          var userBracketPicks = user.bracketSelections[0].picks;
          var username = user.username;
          var r16 = 0;
          var r8 = 0;
          var r4 = 0;
          var r2 = 0;
          var cons = 0;
          var total = user.exact_rank + user.winner + user.runner_up + user.exact_order;

          for (var i=0; i<winners.length; i++) {
            if (i<8) {
              for (var j=0; j<8; j++) {
                if (winners[i] == userBracketPicks[j]) {
                  r16 += 4;
                  total += 4;
                };
              };
            } else if (i>7 && i<12) {
              for (var j=8; j<12; j++) {
                if (winners[i] == userBracketPicks[j]) {
                  r8 += 8;
                  total += 8;
                };
              };
            } else if (i>11 && i<14) {
              for (var j=12; j<14; j++) {
                if (winners[i] == userBracketPicks[j]) {
                  r4 += 14;
                  total += 14;
                };
              };
            } else if (i == 14) {
              if (winners[i] == userBracketPicks[i]) {
                cons += 14;
                total += 14;
              }
            } else if (i == 15) {
              if (winners[i] == userBracketPicks[i]) {
                r2 += 24;
                total += 24;
              }
            }
          };

          WC18Bracket().where({username: username}).update({
            r16: r16,
            r8: r8,
            r4: r4,
            '3rd': cons,
            champ: r2,
            total_score: total
          }, '*').then(function(returned){
            console.log(returned, ' has been updated');
          })
        })
      })
    })
  });


// setTimeout(calcBrackets, 3000);


  // WC18Bracket().then(function(users){
  //   users.forEach(function(user){
  //     userBracketPicks = user.bracketSelections[0].picks;
  //       var r16 = 0;
  //       var r8 = 0;
  //       var r4 = 0;
  //       var r2 = 0;
  //       var cons = 0;
  //
  //       Results().where({
  //         round: bracket,
  //         final: true
  //       }).then(function(games){
  //         games.forEach(function(game){
  //           var winner;
  //           if (game[0].away_points > game[0].home_points) {
  //             winner = game[0].away_team;
  //           } else {
  //             winner = game[0].home_team;
  //           };
  //
  //           if (game[0].group == 'Round of 16') {
  //             for (var i = 0; i < 8; i++) {
  //               if (userBracketPicks[i] == winner) {
  //                 r16 += 4;
  //               }
  //             }
  //           } else if (game[0].group == 'Round of 8') {
  //             for (var i = 8; i < 12; i++) {
  //               if (userBracketPicks[i] == winner) {
  //                 r8 += 8;
  //               }
  //             }
  //           } else if (game[0].group == 'Round of 4') {
  //             for (var i = 12; i < 14; i++) {
  //               if (userBracketPicks[i] == winner) {
  //                 r4 += 14;
  //               }
  //             }
  //           } else if (game[0].group == 'Cons') {
  //             if (userBracketPicks[14] == winner) {
  //               cons += 14;
  //             }
  //           } else if (game[0].group == 'Round of 2') {
  //             if (userBracketPicks[15] == winner) {
  //               r2 += 24;
  //             }
  //           };
  //
  //         })
  //       })
  //
  //   })
  // })
// })




router.get('/calcStandings', function(req, res, next){
  TeamStats().pluck('team').orderBy('group').orderBy('group_pts', 'desc').orderBy('group_goal_dif', 'desc').orderBy('group_goals', 'desc').orderBy('group_tb', 'desc').then(function(ordered){
    var groupA = ordered.slice(0, 4);
    var groupB = ordered.slice(4, 8);
    var groupC = ordered.slice(8, 12);
    var groupD = ordered.slice(12, 16);
    var groupE = ordered.slice(16, 20);
    var groupF = ordered.slice(20, 24);
    var groupG = ordered.slice(24, 28);
    var groupH = ordered.slice(28, 32);

    var standingsObj = {
      "groups": {"A": groupA, "B": groupB, "C": groupC, "D": groupD, "E": groupE, "F": groupF, "G": groupG, "H": groupH}
    };

    WC18Bracket().then(function(users){
      users.forEach(function(user){
        var exact_rank = 0;
        var exact_order = 0;
        var winners = 0;
        var runners_up = 0;
        var total = 0;

        userGroupPicks = user.groupSelections[0].groups;

        Object.values(standingsObj.groups).forEach(function(value, index){
          // CHECKS FOR EXACT ORDER
          if (value.equals(Object.values(userGroupPicks)[index])) {
            exact_order += 3
          };

          // CHECKS FOR GROUP WINNERS
          if (value[0] == Object.values(userGroupPicks)[index][0]) {
            winners += 5;
          };

          // CHECKS FOR GROUP RUNNERS-UP
          if (value[1] == Object.values(userGroupPicks)[index][1]) {
            runners_up += 3;
          };

          // CHECKS FOR EXACT RANK
          for (var i = 0; i < value.length; i++) {
            if (value[i] == Object.values(userGroupPicks)[index][i]) {
              exact_rank++;
            }
          };

          total = exact_order + winners + runners_up + exact_rank;
        })

        WC18Bracket().where({username: user.username}).update({
          exact_rank: exact_rank,
          winner: winners,
          runner_up: runners_up,
          exact_order: exact_order,
          total_score: total
        }, '*').then(function(updated){
          console.log(updated, ' has been updated!')
        })
      })
    })
  })
})

// This compilePoolStats fn compiles the stats for the pool picks -- it is only necessary to run once after picks have been submitted, or any time an entrant's picks have changed

var compilePoolStats = function() {
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

// setTimeout(compilePoolStats, 3000);


module.exports = router;
