angular
  .module('mySite')
  .controller('MusicController', ['$scope', '$state', '$anchorScroll', '$location', 'spotifyService', MusicController])

function MusicController ($scope, $state, $anchorScroll, $location, spotifyService) {
  $scope.$state = $state;

  $scope.$on('$stateChangeSuccess', function(){
    document.body.scrollTop = document.documentElement.scrollTop=0
  })

  $scope.vm.gotoId = function(id) {
    var old = $location.hash();
    $location.hash(id);
    $anchorScroll();
    $location.hash(old);
  };
}
