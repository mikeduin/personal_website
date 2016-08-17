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
  $scope.vm.fridgeRequest = false;
  $scope.formData = {};

  $scope.vm.requestBeer = function(beer, name, eta){
    var beerRequest = {};
    beerRequest.beer = beer.name;
    beerRequest.name = name;
    beerRequest.eta = eta;
    beerService.requestBeer(beerRequest).then(function(result){
      console.log('beer has been fridged!')
    })
    // console.log('beer is ', beer);
    // console.log('name is ', name);
    // console.log('name is ', eta);
  }

  // $scope.checkParams = function(){
  //   if ($stateParams.beername !== undefined) {
  //     console.log($stateParams.beername);
  //     console.log("there is a beer here");
  //     $scope.vm.showInstructions = false;
  //   } else {
  //     console.log($stateParams.beername);
  //     console.log("there is no beer")
  //   }
  // }

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
      $scope.vm.beer.ordered = new Date(beer[0].ordered);
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
