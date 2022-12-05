angular
  .module('mySite')
  .controller('WCBracketController', ['$scope', '$state', '$stateParams', 'authService', 'alaService', 'WCBracketService', WCBracketController])

function WCBracketController ($scope, $state, $stateParams, authService, alaService, WCBracketService) {
  $scope.vm.systemYear = 2022;

  $scope.vm.groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  $scope.vm.sortOrder = '-champion';
  $scope.vm.activeUser = authService.currentUser();
  $scope.vm.selectedUser = $stateParams.username;
  $scope.vm.viewingOwnPicks = $scope.vm.activeUser === $scope.vm.selectedUser;

  if (!$scope.vm.activeSeason) {
    $scope.vm.activeSeason = 2022;
  }

  const checkForSeasonStart = () => {
    return moment().isBefore($scope.vm.activePool.start_time);
  }

  $scope.vm.seasons = [
    {id: 1, name: '2022', value: 2022},
    {id: 2, name: '2018', value: 2018},
  ]

  $scope.vm.seasonChange = (season) => {
    $scope.vm.activeSeason = parseInt(season);
    $scope.vm.activePool = $scope.vm.pools.filter(p => p.season === $scope.vm.activeSeason)[0];
    $scope.vm.inTime = checkForSeasonStart();
    updateActiveSeasonData();
    pullStandings();
    pullTeamStats();
    pullResults();
  }

  $scope.vm.userChange = (user, page) => {
    $state.go(`home.ala.wc18bracket.${page}`, {username: user});
  };

  $scope.vm.activeGroupFinished = (groupLetter) => {
    const activeGroup = $scope.vm[`group${groupLetter}`];
    return activeGroup.filter(t => t.group_gp === 3).length === 4;
  }

  $scope.vm.getGroupPickStyle = (team, groupLetter, idx) => {
    const activeGroup = $scope.vm[`group${groupLetter}`];
    const activeGroupFinished = $scope.vm.activeGroupFinished(groupLetter);
    if (team == activeGroup[idx].team) {
      if (activeGroupFinished) {
        return {'background-color': '#c1e5b2'}
      } else {
        return {'background-color': '#dcecd6'}
      }
      
    } else {
      return {'background-color': null}
    }
  }

  $scope.vm.groupScore = groupLetter => {
    const activeGroup = $scope.vm[`group${groupLetter}`];
    const userGroupPicks = $scope.vm.models.groups[groupLetter];
    let total = 0;
    userGroupPicks.forEach((pick, idx) => {
      if (idx === 0 && pick === activeGroup[idx].team) {
        total+=6;
      } else if (idx === 1 && pick === activeGroup[idx].team) {
        total+=4;
      } if (idx > 1 && pick === activeGroup[idx].team) {
        total++;
      }
    })
    return total === 12 ? '15 PTS [100%]' : `${total} PTS`;
  }

  $scope.vm.checkRanking = (team, groupLetter, idx) => {
    const activeGroup = $scope.vm[`group${groupLetter}`];
    if (activeGroup[idx].team === team) {
      return true;
    } else {
      return false;
    }  
  }

  $scope.vm.getGroupStats = (team, filter) => {
    const filteredTeam = $scope.vm.teamStats.filter(t => t.team === team);
    return filteredTeam[0][filter];
  }

  const updateActiveSeasonData = () => {
    pullStandings().then(() => {
      if ($scope.vm.viewingOwnPicks && $scope.vm.userData) {
        const { wcEntries } = $scope.vm.userData;
        const userSeasonYears = wcEntries.map(e => e.season);
        $scope.vm.userLoggedInAndRegistered = userSeasonYears.includes($scope.vm.activeSeason);
        $scope.vm.isCurrentSystemYear = $scope.vm.activeSeason === $scope.vm.systemYear;
        const activeWcEntry = wcEntries.filter(e => e.season === $scope.vm.activeSeason)[0];
        if (activeWcEntry) {
          $scope.vm.models = activeWcEntry.groupSelections[0];
          $scope.vm.bracketPicks = activeWcEntry.bracketSelections[0].picks;
          $scope.vm.consOne = activeWcEntry.bracketSelections[0].consOne;
          $scope.vm.consTwo = activeWcEntry.bracketSelections[0].consTwo;
          $scope.vm.original = angular.copy($scope.vm.models);
        } 
      } else {
        $scope.vm.userLoggedInAndRegistered = true;
        const activeWcEntry = $scope.vm.standings.filter(user => user.username === $scope.vm.selectedUser)[0];
        if (activeWcEntry) {
          $scope.vm.models = activeWcEntry.groupSelections[0];
          $scope.vm.bracketPicks = activeWcEntry.bracketSelections[0].picks;
          $scope.vm.consOne = activeWcEntry.bracketSelections[0].consOne;
          $scope.vm.consTwo = activeWcEntry.bracketSelections[0].consTwo;
          $scope.vm.original = angular.copy($scope.vm.models);
        } 
      }
    })

  }

  $scope.vm.retrievePools = function() {
    alaService.retrievePools().then(function(pools){
      $scope.vm.pools = pools.filter(p => p.sport === "worldcup");
      $scope.vm.activePool = pools.filter(p => p.season === $scope.vm.activeSeason)[0];
      $scope.vm.inTime = checkForSeasonStart($scope.vm.activeSeason);
    })
  }

  $scope.vm.bracketMismatch = (winner, teamA, teamB) => (winner && winner.length && winner !== teamA && winner !== teamB);

  $scope.vm.isLoggedIn = function(){
    return authService.isLoggedIn();
  };

  $scope.vm.logOut = function(){
    authService.logOut();
  };

  $scope.vm.currentUser = function(){
    return authService.currentUser();
  };

  $scope.vm.getUser = function(){
    user = $scope.vm.currentUser();
    alaService.getUser(user).then(function(res){
      $scope.vm.userData = res[0];
      updateActiveSeasonData();
    })
  };

  $scope.vm.getUser();

  $scope.vm.getFlags = function(){
    WCBracketService.getFlags().then(function(flags){
      $scope.vm.flags = flags;
    });
  };

  $scope.vm.getFlags();

  const getAdvancing = function() {
    WCBracketService.getAdvancing($scope.vm.activeSeason).then(function(res){
      console.log('res is ', res);
      $scope.vm.advancing = res.advancing;
      $scope.vm.eliminated = res.eliminated;
      $scope.vm.bracketWinners = res.bracketWinnersObj;
    })
  };
  getAdvancing();

  $scope.vm.saveGroupPicks = function(){
    if ($scope.vm.inTime || $scope.vm.isLateGroupUser) {
      const picks = {
        user: $scope.vm.currentUser(),
        picks: $scope.vm.models,
        season: $scope.vm.activeSeason
      };
      WCBracketService.saveGroupPicks(picks).then(function(res){
        $state.go('home.ala.wc18bracket.groups.picksSaved');
      })
    }
  };

  $scope.vm.saveBracketPicks = function(){
    if ($scope.vm.inTime || $scope.vm.isLateUser) {
      for (var i = 0; i < $scope.vm.bracketPicks.length; i++) {
        if ($scope.vm.bracketPicks[i] == null) {
          $state.go('home.ala.wc18bracket.bracket.picksIncomplete');
          return
        }
      };
  
      const user = $scope.vm.currentUser();
      const picks = {
        user: user,
        picks: $scope.vm.bracketPicks,
        season: $scope.vm.activeSeason,
        consOne: $scope.vm.consOne,
        consTwo: $scope.vm.consTwo
      };
      WCBracketService.saveBracketPicks(picks).then(function(res){
        $state.go('home.ala.wc18bracket.bracket.picksSaved');
      })
    }
  };

  const pullStandings = () => {
    return WCBracketService.pullStandings($scope.vm.activeSeason).then(function(res){
      $scope.vm.standings = res;
      const allUsers = res.map((user, idx) => {
        return {
          key: idx,
          username: user.username,
          value: user.uername,
        }
      });
      $scope.vm.users = allUsers.sort((a, b) => a.username.localeCompare(b.username));
      return;
    })
  }

  // pullStandings();

  $scope.vm.calcGroups = function(season) {
    WCBracketService.calcGroups(season).then(function(res){
      console.log('res to controller is ', res);
    })
  }

  $scope.vm.calcBrackets = function(season) {
    WCBracketService.calcBrackets(season).then(function(res){
      console.log('res to controller is ', res);
    })
  }

  $scope.vm.calcStandings = function(season) {
    WCBracketService.calcStandings(season).then(function(res){
      console.log('res to controller is ', res);
    })
  }

  const sortGroup = (a, b) => {
    return b.group_pts - a.group_pts || b.group_goal_dif - a.group_goal_dif || b.group_goals - a.group_goals || b.group_tb - a.group_tb;
  }

  const pullTeamStats =  () => {
    WCBracketService.pullTeamStats($scope.vm.activeSeason).then(function(res){
      $scope.vm.teamStats = res;
      $scope.vm.groupA = $scope.vm.teamStats.filter(t => t.group === 'A').sort(sortGroup);
      $scope.vm.groupB = $scope.vm.teamStats.filter(t => t.group === 'B').sort(sortGroup);
      $scope.vm.groupC = $scope.vm.teamStats.filter(t => t.group === 'C').sort(sortGroup);
      $scope.vm.groupD = $scope.vm.teamStats.filter(t => t.group === 'D').sort(sortGroup);
      $scope.vm.groupE = $scope.vm.teamStats.filter(t => t.group === 'E').sort(sortGroup);
      $scope.vm.groupF = $scope.vm.teamStats.filter(t => t.group === 'F').sort(sortGroup);
      $scope.vm.groupG = $scope.vm.teamStats.filter(t => t.group === 'G').sort(sortGroup);
      $scope.vm.groupH = $scope.vm.teamStats.filter(t => t.group === 'H').sort(sortGroup);
    })
  };

  pullTeamStats();

  const pullResults = function () {
    WCBracketService.pullResults($scope.vm.activeSeason).then(function(res){
      $scope.vm.results = res;
    })
  }

  pullResults();

  $scope.vm.clearBracketPicks = function(){
    if ($scope.vm.inTime || $scope.vm.isLateUser) {
      for (var i=0; i<$scope.vm.bracketPicks.length; i++){
        $scope.vm.bracketPicks[i] = null;
      };
      $scope.vm.consOne = null;
      $scope.vm.consTwo = null;
    }
  };

  $scope.vm.makeBracketPick = (position, team, consPosition = null, consTeam = null) => {
    if ($scope.vm.inTime || $scope.vm.isLateUser) {
      $scope.vm.bracketPicks[position] = team;
      if (consPosition && consTeam) {
        $scope.vm[consPosition] = consTeam;
      }
    }
  }

  $scope.vm.checkAdvance = (round, team) => {
    if($scope.inTime) {
      if (round == 1) {
        for (i=8; i<$scope.vm.bracketPicks.length; i++) {
          if ($scope.vm.bracketPicks[i] == team) {
            $scope.vm.bracketPicks[i] = null;
          };
        };
      } else if (round == 2) {
        for (i=12; i<$scope.vm.bracketPicks.length; i++) {
          if ($scope.vm.bracketPicks[i] == team) {
            $scope.vm.bracketPicks[i] = null;
          };
        };
      } else if (round == 3) {
        for (i=14; i<$scope.vm.bracketPicks.length; i++) {
          if ($scope.vm.bracketPicks[i] == team) {
            $scope.vm.bracketPicks[i] = null
          }
        }
      }
    }
  };

  $scope.vm.moveUp = function(group, $index, team) {
    $scope.vm.models.groups[group].splice($index, 1);
    $scope.vm.models.groups[group].splice($index-1, 0, team);
  };

  $scope.vm.moveDown = function(group, $index, team) {
    $scope.vm.models.groups[group].splice($index, 1);
    $scope.vm.models.groups[group].splice($index+1, 0, team);
  };

}
