angular
  .module('mySite')
  .controller('AuthController', ['$scope', '$state', '$window', 'authService', AuthController])

function AuthController ($scope, $state, $window, authService) {
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

  $scope.googleSignIn = function(){
    $window.location.href = '/users/auth/google';
    // authService.googleSignIn();
  }

}
