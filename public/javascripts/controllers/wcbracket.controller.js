angular
  .module('mySite')
  .controller('WCBracketController', ['$state', 'authService', 'WCBracketService', WCBracketController])

function WCBracketController ($state, authService, WCBracketService) {
  var vm = this;

  vm.isLoggedIn = function(){
    return authService.isLoggedIn();
  };

  vm.logOut = function(){
    authService.logOut();
  };

  vm.currentUser = function(){
    return authService.currentUser();
  };

  (vm.loadPicks = function(){
    var user = vm.currentUser();
    WCBracketService.getPicks(user).then(function(userData){
      vm.models = userData[0].groupSelections[0];
      // vm.models = res;
      console.log(vm.models);
    })
  })();

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
