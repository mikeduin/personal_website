angular
  .module('mySite')
  .controller('AuthController', ['$scope', '$state', 'authService', AuthController])

function AuthController ($scope, $state, authService) {
  var vm = this;

  console.log('hello');

  // $(document).ready(function () {
  //   $('.modal').modal();
  //   $('.tooltipped').tooltip({delay: 20});
  // })

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

  // vm.openModal = function(){
  //   $('#modal1').modal('open');
  // };
  //
  // vm.closeModal = function(){
  //   $('#modal1').modal('close');
  // };
}
