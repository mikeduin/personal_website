angular
  .module('mySite')
  .controller('WCBracketController', ['$scope', '$state', 'authService', 'alaService', 'WCBracketService', WCBracketController])

function WCBracketController ($scope, $state, authService, alaService, WCBracketService) {
  $scope.vm.systemYear = 2022;

  $scope.vm.groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  $scope.vm.sortOrder = '-champion';
  if (!$scope.vm.activeSeason) {
    $scope.vm.activeSeason = 2022;
  } else {
    console.log('active season is ', $scope.vm.activeSeason);
  }

  const checkForSeasonStart = () => {
    return moment().isBefore($scope.vm.activePool.start_time);
  }

  $scope.vm.lateUsers = ['alaguire', 'daveecfc', 'HalfManHalfAmazing', 'Iaio', 'Tomer', 'livvcali', 'willski21'];
  $scope.vm.lateGroupUsers = ['Tomer', 'livvcali', 'willski21'];

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

  const updateActiveSeasonData = () => {
    if ($scope.vm.userData) {
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
    }

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
      console.log('userData ', $scope.vm.userData);
      updateActiveSeasonData();
      $scope.vm.isLateUser = $scope.vm.lateUsers.includes(user);
      $scope.vm.isLateGroupUser = $scope.vm.lateGroupUsers.includes(user);
      console.log('isLateUser is ', $scope.vm.isLateUser);
    })
  };

  $scope.vm.getUser();

  $scope.vm.getFlags = function(){
    WCBracketService.getFlags().then(function(flags){
      $scope.vm.flags = flags;
      console.log('flags are ', flags);
    });
  };

  $scope.vm.getFlags();

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
  
      var user = $scope.vm.currentUser();
      var picks = {
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
    console.log('activeSeason in pullStandings is ', $scope.vm.activeSeason);
    WCBracketService.pullStandings($scope.vm.activeSeason).then(function(res){
      $scope.vm.standings = res;
    })
  }

  pullStandings();

  $scope.vm.calcGroups = function() {
    WCBracketService.calcGroups().then(function(res){
      console.log('res to controller is ', res);
    })
  }

  $scope.vm.calcBrackets = function() {
    WCBracketService.calcBrackets().then(function(res){
      console.log('res to controller is ', res);
    })
  }

  $scope.vm.calcStandings = function() {
    WCBracketService.calcStandings().then(function(res){
      console.log('res to controller is ', res);
    })
  }

  const pullTeamStats =  () => {
    WCBracketService.pullTeamStats($scope.vm.activeSeason).then(function(res){
      $scope.vm.teamStats = res;
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
