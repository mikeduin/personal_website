angular
  .module('mySite')
  .controller('WCBracketController', ['$scope', '$state', 'authService', 'WCBracketService', WCBracketController])

function WCBracketController ($scope, $state, authService, WCBracketService) {

  $scope.vm.isLoggedIn = function(){
    return authService.isLoggedIn();
  };

  $scope.vm.logOut = function(){
    authService.logOut();
  };

  $scope.vm.currentUser = function(){
    return authService.currentUser();
  };

  // $scope.vm.isRegistered = function(){
  //
  // }

  $scope.vm.loadPicks = function(){
    var user = $scope.vm.currentUser();
    WCBracketService.getPicks(user).then(function(userData){
      $scope.vm.models = userData[0].groupSelections[0];
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
      console.log(res);
    })
  };

  $scope.vm.bracketPicks = {
    'r16g1': null,
    'r16g2': null,
    'r16g3': null,
    'r16g4': null,
    'r16g5': null,
    'r16g6': null,
    'r16g7': null,
    'r16g8': null,
    'r8g1': null,
    'r8g2': null,
    'r8g3': null,
    'r8g4': null,
    'r4g1': null,
    'r4g2': null,
    'final': null,
    'consolation': null
  }

  $scope.vm.moveUp = function(group, $index, team) {
    $scope.vm.models.groups[group].splice($index, 1);
    $scope.vm.models.groups[group].splice($index-1, 0, team);
    console.log($scope.vm.models);
    console.log($scope.vm.original);
  };

  $scope.vm.moveDown = function(group, $index, team) {
    $scope.vm.models.groups[group].splice($index, 1);
    $scope.vm.models.groups[group].splice($index+1, 0, team);
  };



  // $scope.models = {
  //   selected: null,
  //   lists: {
  //     "Group A": ["Russia", "Saudi Arabia", "Egypt", "Uruguay"],
  //     "Group B": ["Portugal", "Morocco", "Spain", "Iran"]
  //   }
  // };

  // // Generate initial model
  // for (var i = 1; i <= 3; ++i) {
  //     $scope.models.lists.A.push({label: "Item A" + i});
  //     $scope.models.lists.B.push({label: "Item B" + i});
  // }

  // Model to JSON for demo purpose
  // $scope.$watch('models', function(model) {
  //     $scope.modelAsJson = angular.toJson(model, true);
  // }, true);

  // console.log($scope.models);
}
