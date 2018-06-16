angular
  .module('mySite')
  .controller('WCBracketController', ['$scope', '$state', 'authService', 'alaService', 'WCBracketService', WCBracketController])

function WCBracketController ($scope, $state, authService, alaService, WCBracketService) {
  $scope.vm.groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  $scope.vm.sortOrder = 'group';

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
    })
  };

  $scope.vm.getUser();

  $scope.vm.checkTime = function () {
    if (moment().isBefore('2018-06-14T15:00:00+0000')) {
      $scope.inTime = true;
    } else {
      $scope.inTime = false;
    }
  };
  $scope.vm.checkTime();

  $scope.vm.loadPicks = function(){
    var user = $scope.vm.currentUser();
    WCBracketService.getPicks(user).then(function(userData){
      $scope.vm.models = userData[0].groupSelections[0];
      $scope.vm.bracketPicks = userData[0].bracketSelections[0].picks;
      $scope.vm.consOne = userData[0].bracketSelections[0].consOne;
      $scope.vm.consTwo = userData[0].bracketSelections[0].consTwo;
      $scope.vm.original = angular.copy($scope.vm.models);
    })
  };

  $scope.vm.saveGroupPicks = function(){
    var user = $scope.vm.currentUser();
    var data = {
      user: user,
      picks: $scope.vm.models
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

  $scope.vm.pullTeamStats = function () {
    WCBracketService.pullTeamStats().then(function(res){
      console.log('team stats are ', res);
      $scope.vm.teamStats = res;
    })
  };

  $scope.vm.pullTeamStats();

  // AM I STILL USING THIS?
  $scope.vm.getUserPage = function(user) {
    WCBracketService.getUserPage(user).then(function(res){
      console.log('user data is ', res);
    })
  }

  $scope.vm.clearBracketPicks = function(){
    for (var i=0; i<$scope.vm.bracketPicks.length; i++){
      $scope.vm.bracketPicks[i] = null;
    };
    $scope.vm.consOne = null;
    $scope.vm.consTwo = null;
  };

  $scope.vm.checkAdvance = function(round, team) {
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
