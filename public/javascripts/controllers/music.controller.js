angular
  .module('mySite')
  .controller('MusicController', ['$scope', '$state', 'spotifyService', MusicController])

function MusicController ($scope, $state, spotifyService) {
  $scope.$state = $state;

}
