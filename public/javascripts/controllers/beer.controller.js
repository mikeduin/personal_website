angular
  .module('mySite')
  .controller('BeerController', ['$scope', '$anchorScroll', '$location', '$state', '$stateParams', 'beerService', BeerController])

function BeerController ($scope, $anchorScroll, $location, $state, $stateParams, beerService) {
  $scope.showSearch = false;
  $scope.vm = {};
  $scope.vm.showInstructions = true;
  $scope.vm.sortOrder = '-ordered';
  $scope.vm.coldFilter = false;
  $scope.vm.emptyFilter = false;
  $scope.vm.currentFilter = true;
  $scope.vm.beers = [];
  $scope.vm.breweries = [];
  $scope.vm.styles = [];
  $scope.formData = {};

  $scope.vm.gotoId = function(id) {
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

  $scope.getStyles = function() {
    beerService.getStyles().then(function(styles){
      $scope.vm.styles = styles;
    })
  };
  $scope.getStyles();

  $scope.vm.topOfBeerList = function(){
    var bottleList = document.getElementById('bottleList');
    bottleList.scrollTop=0;
  };
  $scope.vm.addBeer = function() {
    beerService.addBeer($scope.formData).then(function(){
      $state.go('home.fridge');
      $scope.formData = {};
      console.log('Beer has been added!')
    })
  };
  $scope.vm.beer = {};
  $scope.getBeer = function() {
    beerService.getBeer($stateParams.beername).then(function(beer){
      $scope.vm.beer = beer[0];
      $scope.vm.beer.ordered = new Date(beer[0].ordered);
      console.log($scope.vm.beer)
    })
  };
  $scope.getBeer();
  $scope.vm.editBeer = function() {
    beerService.editBeer($scope.vm.beer).then(function(){
      $state.go('home.fridge');
      console.log('Beer has been updated!')
    })
  };
  $scope.vm.deleteBeer = function() {
    beerService.deleteBeer($scope.vm.beer).then(function(){
      $state.go('home.fridge');
      $scope.getBeers();
      console.log('Beer has been deleted')
    })
  };
}
