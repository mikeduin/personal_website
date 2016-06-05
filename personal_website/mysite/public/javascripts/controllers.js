angular
  .module('mySite')
  .controller('MainController', ['$scope', '$state', MainController])
  .controller('MusicController', ['$scope', '$state', 'spotifyService', MusicController])
  .controller('AlaController', ['$scope', '$state', AlaController])

function MainController ($scope, $state){
  $scope.$state = $state;
}

function MusicController ($scope, $state, spotifyService) {
  $scope.$state = $state;
  //
  // $scope.getPlaylists = function() {
  //   spotifyService.getPlaylists().then(function(playlists){
  //     $scope.playlists = playlists;
  //     console.log(playlists)
  //   })
  // }
  // $scope.getPlaylists();
}

function AlaController ($scope, $state) {
  $scope.$state = $state;
  $scope.showFantasyNBA = false;
  $scope.showAlaHoops = false;
  $scope.showAlaCdl = false;
  $scope.showMadness = false;
  $scope.showNcaaPickem = false;
  $scope.showBtb = false;
  $scope.showBaseball = false;
  $scope.showEffRoto = false;
  $scope.showFootball = false;
  $scope.showSurvivor = false;
  $scope.showConfidence = false;
}
