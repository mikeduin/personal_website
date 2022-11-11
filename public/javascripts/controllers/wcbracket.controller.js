angular
  .module('mySite')
  .controller('WCBracketController', ['$scope', '$state', 'authService', 'alaService', 'WCBracketService', WCBracketController])

function WCBracketController ($scope, $state, authService, alaService, WCBracketService) {
  let activePool;
  $scope.inTime = true;

  $scope.vm.groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  $scope.vm.sortOrder = 'group';
  $scope.vm.activeSeason = 2022;
  $scope.vm.seasons = [
    {id: 1, name: '2022', value: 2022},
    {id: 2, name: '2018', value: 2018},
  ]
  $scope.vm.seasonChange = (season) => {
    $scope.vm.activeSeason = season;
  }

  $scope.vm.retrievePools = function() {
    alaService.retrievePools().then(function(pools){
      $scope.vm.pools = pools.filter(p => p.sport === "worldcup");
      activePool = pools.filter(p => p.season === $scope.vm.activeSeason)[0];
      $scope.inTime = moment().isBefore(activePool.start_time);
      // console.log('activePool ', $scope.vm.activePool);
    })
  }

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
      const { wcEntries } = res[0];
      const userSeasonYears = wcEntries.map(e => e.season);
      $scope.vm.userLoggedInAndRegistered = userSeasonYears.includes($scope.vm.activeSeason);
      
      const activeWcEntry = wcEntries.filter(e => e.season === $scope.vm.activeSeason)[0];
      $scope.vm.models = activeWcEntry.groupSelections[0];
      $scope.vm.bracketPicks = activeWcEntry.bracketSelections[0].picks;
      $scope.vm.consOne = activeWcEntry.bracketSelections[0].consOne;
      $scope.vm.consTwo = activeWcEntry.bracketSelections[0].consTwo;
      $scope.vm.original = angular.copy($scope.vm.models);


      console.log('vm.models ', $scope.vm.models);
      
      console.log('userData is ', $scope.vm.userData);
    })
  };

  $scope.vm.getUser();

  $scope.vm.getFlags = function(){
    WCBracketService.getFlags().then(function(flags){
      $scope.vm.flags = flags;
    });
  };

  $scope.vm.getFlags();

  $scope.vm.loadPicks = function(){ // this whole fn might be unnecessary now that I am attaching all picks in initial user pull
    var user = $scope.vm.currentUser();
    WCBracketService.getPicks(user).then(function(userData){
      $scope.vm.models = userData[0].groupSelections[0];
      $scope.vm.bracketPicks = userData[0].bracketSelections[0].picks;
      $scope.vm.consOne = userData[0].bracketSelections[0].consOne;
      $scope.vm.consTwo = userData[0].bracketSelections[0].consTwo;
      $scope.vm.original = angular.copy($scope.vm.models);
    })
  };
  $scope.vm.loadPicks();

  $scope.vm.saveGroupPicks = function(){
    const data = {
      user: $scope.vm.currentUser(),
      picks: $scope.vm.models,
      season: $scope.vm.activeSeason
    };
    WCBracketService.saveGroupPicks(data).then(function(res){
      $state.go('home.ala.wc18bracket.groups.picksSaved');
    })
  };

  $scope.vm.saveBracketPicks = function(){
    for (var i = 0; i < $scope.vm.bracketPicks.length; i++) {
      if ($scope.vm.bracketPicks[i] == null) {
        $state.go('home.ala.wc18bracket.bracket.picksIncomplete');
        return
      }
    };

    var user = $scope.vm.currentUser();
    var data = {
      user: user,
      picks: $scope.vm.bracketPicks,
      consOne: $scope.vm.consOne,
      consTwo: $scope.vm.consTwo
    };
    WCBracketService.saveBracketPicks(data).then(function(res){
      $state.go('home.ala.wc18bracket.bracket.picksSaved');
    })
  };

  $scope.vm.pullStandings = function() {
    WCBracketService.pullStandings().then(function(res){
      $scope.vm.standings = res;
    })
  }

  $scope.vm.pullStandings();

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

  $scope.vm.pullTeamStats = function () {
    WCBracketService.pullTeamStats().then(function(res){
      $scope.vm.teamStats = res;
    })
  };

  $scope.vm.pullTeamStats();

  $scope.vm.pullResults = function () {
    WCBracketService.pullResults().then(function(res){
      $scope.vm.results = res;
    })
  }

  $scope.vm.pullResults();

  $scope.vm.clearBracketPicks = function(){
    for (var i=0; i<$scope.vm.bracketPicks.length; i++){
      $scope.vm.bracketPicks[i] = null;
    };
    $scope.vm.consOne = null;
    $scope.vm.consTwo = null;
  };

  $scope.vm.makeBracketPick = (position, team, consPosition = null, consTeam = null) => {
    if ($scope.inTime) {
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
