angular
  .module('mySite')
  .controller('MainController', ['$scope', '$state', MainController])
  .controller('MusicController', ['$scope', '$state', 'spotifyService', MusicController])
  .controller('AlaController', ['$scope', '$state', AlaController])
  .controller('BeerController', ['$scope', '$state', '$stateParams', 'beerService', BeerController])
  .controller('BeerDetailController', ['$scope', '$stateParams', 'beerService', BeerDetailController])

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

function BeerController ($scope, $state, $stateParams, beerService) {
  $scope.showSearch = false;
  $scope.beers = [];
  $scope.getBeers = function() {
    beerService.getBeers().then(function(beers){
      $scope.beers = beers;
    })
  }
  $scope.getBeers();


}

function BeerDetailController ($scope, $stateParams, beerService) {
  $scope.beer = [];
  $scope.getBeer = function() {
    beerService.getBeer($stateParams.beername).then(function(beer){
      console.log(beer);
      console.log(beer[0].name);
      $scope.beer = beer[0];
    })
  }
  $scope.getBeer();
  console.log($scope.beer)
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
