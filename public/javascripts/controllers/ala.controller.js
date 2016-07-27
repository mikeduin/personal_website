angular
  .module('mySite')
  .controller('AlaController', ['$scope', '$anchorScroll', '$location', 'alaService', '$state', '$stateParams', AlaController])

function AlaController ($scope, $anchorScroll, $location, alaService, $state, $stateParams) {
  $scope.$state = $state;
  $scope.vm = {};
  $scope.vm.sortOrder = '-date';
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

  $scope.vm.post = {}

  $scope.getPost = function(){
    alaService.getPost($stateParams.titlestring).then(function(post){
      console.log($scope.vm.post)
      $scope.vm.post = post[0];
    })
  }
  $scope.getPost();

  $scope.vm.newpost = {};

  $scope.vm.addBlogpost = function() {
    alaService.addBlogpost($scope.vm.newpost).then(function(){
      $state.go('home.ala.blog.main');
      $scope.vm.newpost = {};
      console.log('new blogpost has been added!')
    })
  };

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

  $scope.vm.footballRecords = {};
  $scope.getFootballRecords = function(){
    alaService.getFootballRecords().then(function(results){
      $scope.vm.footballRecords = results;
    })
  };
  $scope.getFootballRecords();

  $scope.vm.hoopsRecords = {};
  $scope.getHoopsRecords = function(){
    alaService.getHoopsRecords().then(function(results){
      $scope.vm.hoopsRecords = results;
    })
  };
  $scope.getHoopsRecords();

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
