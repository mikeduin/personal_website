angular
  .module('mySite')
  .controller('AuthController', ['$scope', '$state', 'authService', AuthController])

function AuthController ($scope, $state, authService) {
  $scope.register = function(user) {
    authService.register(user).error(function(error){
      $scope.error = error.message;
    }).then(function(){
      $state.go('home.ala.pools');
    })
  };

  $scope.logIn = function(user) {
    authService.logIn(user).error(function(error){
      $scope.error = error.message;
    }).then(function(){
      $state.go('home.ala.pools');
    })
  };
}
