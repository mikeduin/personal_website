angular
  .module('mySite')
  .controller('AuthController', ['$scope', '$state', 'authService', AuthController])

function AuthController ($scope, $state, authService) {

  $scope.vm.register = function(user) {
    authService.register(user).error(function(error){
      vm.error = error.message;
    }).then(function(){
      $state.go('home.ala.blog');
    })
  };

  $scope.vm.logIn = function(user) {
    console.log('gets to controller');
    authService.logIn(user).error(function(error){
      vm.error = error.message;
      console.log(error)
    }).then(function(){
      $state.go('home.ala.blog');
    })
  };

}
