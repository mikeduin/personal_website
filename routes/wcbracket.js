var express = require('express');
const { where } = require('../db/knex');
var router = express.Router();
var knex = require('../db/knex')

function WCBracketEntries () {return knex('wc18bracket')};
function Users () {return knex('users')};
function TeamStats() {return knex('team_stats')};
function Results() {return knex('results')};

// UPDATERS TO ADD SEASON TO OLD DATA

// (async () => {
//   await Results().update({season: 2018});
//   await TeamStats().update({season: 2018});
//   await WCBracketEntries().update({season: 2018});
// })()


// Pluck user names and emails  

// (async () => {
//   const brackets = await WCBracketEntries().where({season: 2022});
//   const userEmails = [];
//   const userNames = [];
//   brackets.forEach(async (bracket, idx) => {
//     const users= await Users().where({username: bracket.username}).select('email', 'nameFirst', 'nameLast');
//     users.forEach(user => {
//       userEmails.push(user.email);
//       userNames.push(`${user.nameFirst} ${user.nameLast}`)
//     })
//     if (idx === brackets.length - 1) {
//       console.log(userEmails);
//       console.log(userNames);
//     }
//   })
// })

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

router.get('/picks/:user', function(req, res, next){
  WCBracketEntries().where({
    username: req.params.user
  }).then(function(picks){
    res.json(picks);
  })
})

router.put('/saveGroupPicks', async (req, res, next) => {
  const { user, picks, season } = req.body;
  const updatedUserEntry = await WCBracketEntries().where({
    username: user,
    season
  }).update({
    groupSelections: [picks],
    modified: new Date()
  }, '*')
  res.json(updatedUserEntry[0].groupSelections[0].groups);
})

router.put('/saveBracketPicks', function(req, res, next){
  console.log('req.body.picks', req.body.picks);
  const update = {picks: [... req.body.picks], consOne: req.body.consOne, consTwo: req.body.consTwo};

  WCBracketEntries().where({
    username: req.body.user,
    season: req.body.season
  }).update({
    bracketSelections: [update],
    modified: new Date()
  }, '*').then(function(returned){
    res.json(returned);
  })
})

router.get('/standings/:season', function(req, res, next){
  WCBracketEntries().where({season: req.params.season}).then(function(data){
    res.json(data);
  })
})

// router.get('/user/:username', function(req, res, next){
//   var user = req.params.username;
//   WCBracketEntries().where('wc18bracket.username', user).innerJoin('users', 'users.username', 'wc18bracket.username')
//   .then(function(data){
//     res.json(data[0]);
//   })
// })

router.get('/usernames', function(req, res, next){
  WCBracketEntries().pluck('username').then(function(data){
    res.json(data);
  })
})

router.get('/teamstats/:season', function(req, res, next){
  TeamStats().where({season: req.params.season}).then(function(data){
    res.json(data);
  })
})

router.get('/results/:season', function(req, res, next){
  Results().where({season: req.params.season}).then(function(data){
    res.json(data);
  })
})

router.get('/advancing/:season', async (req, res, next) => {
  const season = parseInt(req.params.season);
  const away = await Results().where({season, group: 'Round of 16'}).pluck('away_team');
  const home = await Results().where({season, group: 'Round of 16'}).pluck('home_team');
  const advancing = home.concat(away);
  const eliminatedGroup = await TeamStats()
    .where({season})
    .whereNotIn('team', advancing)
    .pluck('team');

  const bracketResults = await Results().where({
    season,
    stage: 'bracket',
    final: true
  }).orderBy('matchtime');

  // const bracketLosers = [];
  // const eliminatedRound16 = [];
  // const eliminatedRound8 = [];
  // const eliminatedRound4 = [];

  const bracketWinnersObj = {
    'r16': [],
    'r8': [],
    'r4': [],
    'cons': [],
    'champ': []
  };

  const bracketLosersObj = {
    'r16': [],
    'r8': [],
    'r4': [],
    'cons': [],
    'champ': []
  };

  for (var i = 0; i < bracketResults.length; i++) {
    // bracketLosers.push(bracketResults[i].winner === bracketResults[i].home_team ? bracketResults[i].away_team : bracketResults[i].home_team)
    if (i<8) {
      bracketWinnersObj['r16'].push(bracketResults[i].winner);
      bracketLosersObj['r16'].push(bracketResults[i].winner === bracketResults[i].home_team ? bracketResults[i].away_team : bracketResults[i].home_team);
    } else if (i>7 && i<12) {
      bracketWinnersObj['r8'].push(bracketResults[i].winner);
      bracketLosersObj['r8'].push(bracketResults[i].winner === bracketResults[i].home_team ? bracketResults[i].away_team : bracketResults[i].home_team);
    } else if (i>11 && i<14) {
      bracketWinnersObj['r4'].push(bracketResults[i].winner);
      bracketLosersObj['r4'].push(bracketResults[i].winner === bracketResults[i].home_team ? bracketResults[i].away_team : bracketResults[i].home_team);
    } else if (i == 14) {
      bracketWinnersObj['cons'].push(bracketResults[i].winner);
      bracketLosersObj['cons'].push(bracketResults[i].winner === bracketResults[i].home_team ? bracketResults[i].away_team : bracketResults[i].home_team);
    } else if (i == 15) {
      bracketWinnersObj['champ'].push(bracketResults[i].winner);
      bracketLosersObj['champ'].push(bracketResults[i].winner === bracketResults[i].home_team ? bracketResults[i].away_team : bracketResults[i].home_team);
    };
  };

  // const eliminated = eliminatedGroup.concat(bracketLosers);
  res.json({advancing, eliminatedGroup, bracketLosersObj, bracketWinnersObj});
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

router.get('/calcGroups/:season', function(req, res, next){
  const { season } = req.params;
  TeamStats().where({season}).pluck('team').then(function(teams){
    Promise.all(teams.map(function(team){
      return Results().where({season, away_team: team}).then(function(results){
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

        return Results().where({season, home_team: team}).then(function(homeResults){

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
          console.log('groupObj is ', groupObj);
          TeamStats().where({season, team: groupObj.team}).update({
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

router.get('/fetchStandings/:season', async (req, res, next) => {
  const season = req.params.season;
  const teamStats = await TeamStats()
    .where({season})
    .pluck('team')
    .orderBy('group')
    .orderBy('group_pts', 'desc')
    .orderBy('group_goal_dif', 'desc')
    .orderBy('group_goals', 'desc')
    .orderBy('group_tb', 'desc');

  const groupA = teamStats.slice(0, 4);
  const groupB = teamStats.slice(4, 8);
  const groupC = teamStats.slice(8, 12);
  const groupD = teamStats.slice(12, 16);
  const groupE = teamStats.slice(16, 20);
  const groupF = teamStats.slice(20, 24);
  const groupG = teamStats.slice(24, 28);
  const groupH = teamStats.slice(28, 32);

  const standingsObj = {
    "groups": {"A": groupA, "B": groupB, "C": groupC, "D": groupD, "E": groupE, "F": groupF, "G": groupG, "H": groupH}
  };

  res.json(standingsObj);
})


router.get('/calcBrackets/:season', function(req, res, next){
  const season = parseInt(req.params.season);
    Results().where({
      stage: 'bracket',
      season,
      final: true
    }).orderBy('matchtime').pluck('winner').then(function(winners){
      WCBracketEntries().where({season}).then(function(users){
        users.forEach(function(user){
          const userBracketPicks = user.bracketSelections[0].picks;
          const username = user.username;
          let r16 = 0;
          let r8 = 0;
          let r4 = 0;
          let r2 = 0;
          let cons = 0;
          let total = user.exact_rank + user.winner + user.runner_up + user.exact_order;

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

          WCBracketEntries().where({username: username, season}).update({
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

router.get('/calcStandings/:season', async (req, res, next) => {
  const season = req.params.season;
  const teams = await TeamStats()
    .where({season})
    .pluck('team')
    .orderBy('group')
    .orderBy('group_pts', 'desc')
    .orderBy('group_goal_dif', 'desc')
    .orderBy('group_goals', 'desc')
    .orderBy('group_tb', 'desc')

  const groupA = teams.slice(0, 4);
  const groupB = teams.slice(4, 8);
  const groupC = teams.slice(8, 12);
  const groupD = teams.slice(12, 16);
  const groupE = teams.slice(16, 20);
  const groupF = teams.slice(20, 24);
  const groupG = teams.slice(24, 28);
  const groupH = teams.slice(28, 32);

  const standingsObj = {
    "groups": {
      "A": groupA, 
      "B": groupB, 
      "C": groupC, 
      "D": groupD, 
      "E": groupE, 
      "F": groupF, 
      "G": groupG, 
      "H": groupH
    }
  };

  const entries = await WCBracketEntries().where({season});
  
  const indexesFinished = [0, 1, 2, 3, 4, 5, 6, 7]; // Update this with concluded groups

  entries.forEach(function(entry){
    let exact_rank = 0;
    let exact_order = 0;
    let winners = 0;
    let runners_up = 0;
    let total = 0;

    userGroupPicks = entry.groupSelections[0].groups;

    Object.values(standingsObj.groups).forEach(function(value, index){
      if (indexesFinished.includes(index)) {
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
      }

    })

    WCBracketEntries().where({id: entry.id}).update({
      exact_rank: exact_rank,
      winner: winners,
      runner_up: runners_up,
      exact_order: exact_order,
      total_score: total,
      modified: new Date()
    }, '*').then(function(updated){
      console.log(updated, ' has been updated!')
    })
  })
})

// This compilePoolStats fn compiles the stats for the pool picks -- it is only necessary to run once after picks have been submitted, or any time an entrant's picks have changed

const compilePoolStats = async (season) => {
  const teams = await TeamStats().where({season});
  const users = await WCBracketEntries().where({season});
  teams.forEach(async teamSeason => {
    let group_1st, group_2nd, group_3rd, group_4th, round_8, round_4, round_2, cons_winner, champion;
    group_1st = group_2nd = group_3rd = group_4th = round_8 = round_4 = round_2 = cons_winner = champion = 0;
    const { team, group } = teamSeason;
    users.forEach(user => {
      if (user.groupSelections[0].groups[group][0] == team) {
        group_1st++;
      } else if (user.groupSelections[0].groups[group][1] == team) {
        group_2nd++;
      } else if (user.groupSelections[0].groups[group][2] == team) {
        group_3rd++;
      } else if (user.groupSelections[0].groups[group][3] == team) {
        group_4th++;
      };
      const bracketPicks = user.bracketSelections[0].picks;
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
    })
    const round_16 = group_1st + group_2nd;
    try {
      const teamUpdated = await TeamStats().where({team, season}).update({
        group_1st,
        group_2nd,
        group_3rd,
        group_4th,
        round_16,
        round_8,
        round_4,
        round_2,
        cons_winner,
        champion
      }, '*')
      console.log('team stats updated for ', teamUpdated[0]);
    } catch (e) {
      console.log('error updating team stats is ', e);
    }
  })
}

// (async => {
//   compilePoolStats(2022)
// });


module.exports = router;
