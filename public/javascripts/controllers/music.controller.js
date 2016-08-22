angular
  .module('mySite')
  .controller('MusicController', ['$scope', '$state', '$anchorScroll', '$location', 'spotifyService', MusicController])

function MusicController ($scope, $state, $anchorScroll, $location, spotifyService) {
  $scope.$state = $state;

  $scope.vm.gotoId = function(id) {
    var old = $location.hash();
    $location.hash(id);
    $anchorScroll();
    $location.hash(old);
  };
}
