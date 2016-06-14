angular
  .module('mySite')
  .run(['$anchorScroll', function($anchorScroll) {
  $anchorScroll.yOffset = 80;
    }])
  .controller('MainController', ['$scope', '$state', MainController])
  .controller('MusicController', ['$scope', '$state', 'spotifyService', MusicController])
  .controller('AlaController', ['$scope', '$anchorScroll', '$location', 'alaService', '$state', AlaController])
  .controller('BeerController', ['$scope', '$anchorScroll', '$location', '$state', 'beerService', BeerController])
  .controller('BeerDetailController', ['$scope', '$stateParams', 'beerService', BeerDetailController])
  .filter('rawHtml', ['$sce', function($sce){
    return function(val) {
      return $sce.trustAsHtml(val);
    };
  }])


function MainController ($scope, $state){
  $scope.$state = $state;
}

function MusicController ($scope, $state, spotifyService) {
  $scope.$state = $state;



}

function BeerController ($scope, $anchorScroll, $location, $state, beerService) {
  $scope.showSearch = false;
  $scope.vm = {};
  $scope.vm.showInstructions = true;
  $scope.vm.sortOrder = '-ordered';
  $scope.vm.beers = [];
  $scope.vm.breweries = [];
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
  $scope.vm.topOfBeerList = function(){
    var bottleList = document.getElementById('bottleList');
    bottleList.scrollTop=0;
  }
}

function BeerDetailController ($scope, $stateParams, beerService) {
  $scope.beer = [];
  $scope.getBeer = function() {
    beerService.getBeer($stateParams.beername).then(function(beer){
      $scope.beer = beer[0];
    })
  }
  $scope.getBeer();
}

function AlaController ($scope, $anchorScroll, $location, alaService, $state) {
  $scope.$state = $state;
  $scope.vm = {};
  $scope.vm.gotoId = function(id) {
    var old = $location.hash();
    $location.hash(id);
    $anchorScroll();
    $location.hash(old);
  };
  $scope.vm.blogposts = [];
  $scope.getBlogposts = function() {
    alaService.getBlogposts().then(function(blogposts){
      $scope.vm.blogposts = blogposts;
      console.log($scope.vm.blogposts);
    })
  };
  $scope.getBlogposts();
  // $scope.myPost= $sce.trustAsHtml(post.post);


  $scope.vm.hoopsPodium = {};
  $scope.getHoopsPodium = function() {
    alaService.getHoopsPodium().then(function(results){
      $scope.vm.hoopsPodium = results;
    })
  };
  $scope.getHoopsPodium();

  $scope.vm.cdlPodium = {};
  $scope.getCdlPodium = function() {
    alaService.getCdlPodium().then(function(results){
      $scope.vm.cdlPodium = results;
    })
  };
  $scope.getCdlPodium();

  $scope.vm.baseballPodium = {};
  $scope.getBaseballPodium = function() {
    alaService.getBaseballPodium().then(function(results){
      $scope.vm.baseballPodium = results;
    })
  };
  $scope.getBaseballPodium();

  $scope.vm.SCFootballPodium = {};
  $scope.getSCFootballPodium = function() {
    alaService.getSCFootballPodium().then(function(results){
      $scope.vm.SCFootballPodium = results;
    })
  };
  $scope.getSCFootballPodium();

  $scope.vm.LOFootballPodium = {};
  $scope.getLOFootballPodium = function() {
    alaService.getLOFootballPodium().then(function(results){
      $scope.vm.LOFootballPodium = results;
    })
  };
  $scope.getLOFootballPodium();

  $scope.vm.GUFootballPodium = {};
  $scope.getGUFootballPodium = function() {
    alaService.getGUFootballPodium().then(function(results){
      $scope.vm.GUFootballPodium = results;
    })
  };
  $scope.getGUFootballPodium();

  $scope.vm.pickemPodium = {};
  $scope.getPickemPodium = function() {
    alaService.getPickemPodium().then(function(results){
      $scope.vm.pickemPodium = results;
    })
  };
  $scope.getPickemPodium();

  $scope.vm.btbPodium = {};
  $scope.getBtBPodium = function() {
    alaService.getBtBPodium().then(function(results){
      $scope.vm.btbPodium = results;
    })
  };
  $scope.getBtBPodium();

  $scope.vm.confidencePodium = {};
  $scope.getConfidencePodium = function() {
    alaService.getConfidencePodium().then(function(results){
      $scope.vm.confidencePodium = results;
    })
  };
  $scope.getConfidencePodium();

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
  $scope.showPga = false;
  $scope.showNbaPlayoffs = false;
  $scope.showFifa = false;
}
