angular
  .module('mySite')
  .controller('WCUserController', ['$scope', '$state', 'alaService', 'WCBracketService', WCUserController])

function WCUserController($scope, $state, alaService, WCBracketService) {
  var vm = this;

  vm.getUserData = function(){
    WCBracketService.getUserData($state.params.username).then(function(res){
      vm.user = res;
      console.log(vm.user);
    })
  };

  vm.getUsers = function(){
    WCBracketService.getUsernames().then(function(res){
      console.log(res);
    })
  }
}
