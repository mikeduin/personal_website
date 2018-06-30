angular
  .module('mySite')
  .controller('WCUserController', ['$scope', '$state', 'alaService', 'WCBracketService', WCUserController])

function WCUserController($scope, $state, alaService, WCBracketService) {
  var vm = this;

  vm.getUserData = function(){
    WCBracketService.getUserData($state.params.username).then(function(res){
      vm.user = res;
    })
  };

  vm.getUsers = function(){
    WCBracketService.getUsernames().then(function(res){
      vm.usernames = res;
      vm.usernames.sort();
    })
  };

  vm.userChange = function(){
    $state.go('home.ala.wc18bracket.user', {username: vm.userFilter});
    vm.getUserData();
  };

  vm.fetchStandings = function () {
    WCBracketService.fetchStandings().then(function(res){
      vm.actualStandings = res;
    })
  };

  vm.fetchStandings();

  $scope.vm.fetchBracketWs = function() {
    WCBracketService.fetchBracketWs().then(function(res){
      $scope.vm.bracketWinners = res;
    })
  }
  $scope.vm.fetchBracketWs();

  var getAdvancing = function() {
    WCBracketService.getAdvancing().then(function(res){
      $scope.vm.advancing = res;
    })
  };
  getAdvancing();

}
