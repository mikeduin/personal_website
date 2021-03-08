angular
  .module('mySite')
  .controller('BeerController', ['$scope', '$anchorScroll', '$location', '$state', '$stateParams', 'beerService', BeerController])

function BeerController ($scope, $anchorScroll, $location, $state, $stateParams, beerService) {
  $scope.showSearch = false;
  $scope.vm = {};
  $scope.vm.sortOrder = '-ordered';
  $scope.vm.coldFilter = false;
  $scope.vm.emptyFilter = true;
  $scope.vm.currentFilter = true;
  $scope.vm.beers = [];
  $scope.vm.breweries = [];
  $scope.vm.styles = [];
  $scope.vm.fridgeRequest = false;
  $scope.formData = {};

  $scope.vm.checkState = function() {
    if ($state.includes('home.fridge.beer') || $state.includes('home.fridge.addbeer') || $state.includes('home.fridge.edit')) {
      $scope.vm.showInstructions = false;
    } else {
      $scope.vm.showInstructions = true;
    }
  }
  $scope.vm.checkState()

  $scope.vm.requestBeer = function(beer, name, eta){
    var beerRequest = {};
    beerRequest.beer = beer.name;
    beerRequest.name = name;
    beerRequest.eta = eta;
    beerRequest.brewery = beer.brewery;
    beerService.requestBeer(beerRequest).then(function(result){
      $scope.vm.fridgeRequest = false;
      $scope.vm.fridgeSuccess = true;
      console.log('beer has been fridged!');
    })
  }

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
      // $scope.vm.showInstructions = true;
      $state.go('home.fridge');
      $scope.formData = {};
      console.log('Beer has been added!')
    })
  };
  $scope.vm.beer = {};
  $scope.getBeer = function() {
    beerService.getBeer($stateParams.beername).then(function(beer){
      $scope.vm.beer = beer[0];
      // $scope.vm.beer.ordered = new Date(beer[0].ordered);
      console.log($scope.vm.beer)
    })
  };
  $scope.getBeer();
  $scope.vm.editBeer = function() {
    beerService.editBeer($scope.vm.beer).then(function(){
      $state.go('home.fridge');
      // $scope.vm.showInstructions = true;
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
