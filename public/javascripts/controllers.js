angular
  .module('mySite')
  .run(['$anchorScroll', function($anchorScroll) {
  $anchorScroll.yOffset = 80;   // always scroll by 50 extra pixels
  }])
  .controller('MainController', ['$scope', '$state', MainController])
  .controller('MusicController', ['$scope', '$state', 'spotifyService', MusicController])
  .controller('AlaController', ['$scope', '$state', AlaController])
  .controller('BeerController', ['$scope', '$anchorScroll', '$location', 'beerService', BeerController])
  .controller('BeerDetailController', ['$scope', '$anchorScroll', '$location', '$stateParams', 'beerService', BeerDetailController])


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

function BeerController ($scope, $anchorScroll, $location, beerService) {
  $scope.showSearch = false;
  $scope.vm = {};
  $scope.vm.sortOrder = '-ordered';
  $scope.vm.beers = [];
  $scope.vm.breweries = [];
  $scope.vm.gotoBeer = function(id) {
    var old = $location.hash();
    $location.hash(id);
    $anchorScroll();
    $location.hash(old);
  };
  $scope.getBeers = function() {
    beerService.getBeers().then(function(beers){
      $scope.vm.beers = beers;
    })
  };
  $scope.getBeers();
  $scope.getBreweries = function() {
    beerService.getBreweries().then(function(breweries){
      $scope.vm.breweries = breweries;
    })
  };
  $scope.getBreweries();
}

function BeerDetailController ($scope, $anchorScroll, $location, $stateParams, beerService) {
  $scope.beer = [];
  $scope.getBeer = function() {
    beerService.getBeer($stateParams.beername).then(function(beer){
      $scope.beer = beer[0];
    })
  }
  $scope.getBeer();
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
