angular
  .module('mySite')
  .controller('WCUserController', ['$scope', '$state', '$stateParams', 'alaService', 'WCBracketService', WCUserController])

function WCUserController($scope, $state, $stateParams, alaService, WCBracketService) {
  var vm = this;

  vm.season = $stateParams.season;
  vm.username = $stateParams.username;

  // vm.getUserData = function(){
  //   WCBracketService.getUserData($state.params.username).then(function(res){
  //     vm.user = res;
  //   })
  // };

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

  const fetchStandings = (season) => {
    console.log('season in fetchStandings is ', season);
    WCBracketService.fetchStandings(season).then(function(res){
      vm.actualStandings = res;
      console.log('vm.actualStandings are ', vm.actualStandings);
    })
  };

  fetchStandings(vm.season);

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
