angular
  .module('mySite')
  .controller('MainController', ['$scope', '$state', '$sce', '$anchorScroll', '$location', '$timeout', '$window', MainController])

function MainController ($scope, $state, $sce, $anchorScroll, $location, $timeout, $window){
  $scope.$state = $state;
  $scope.vm = {};
  $scope.expand = false;
  $scope.$on('$stateChangeSuccess', function(){
    if ($state.includes('home.about') || $state.includes('home.music') || $state.includes('home.ala') || $state.includes('home.professional')) {
      document.body.scrollTop = document.documentElement.scrollTop=0
    }
  })

  var mobileWidth = 770;

  $scope.$on('$stateChangeSuccess', function(){
    if(screen.width <= mobileWidth) {
      $scope.vm.showMobile = true;
      $scope.vm.showMain = false;
    } else {
      $scope.vm.showMain = true;
      $scope.vm.showMobile = false;
    }
  })

  $scope.checkWidth = function() {
    if(document.body.clientWidth <= mobileWidth) {
      $scope.vm.showMobile = true
    } else {
      console.log('width is ', document.body.clientWidth)
      $scope.vm.showMain = true
    }
  }

  $scope.vm.gotoBeer = function(){
    $timeout(function(){
      $anchorScroll('fridge-header');
      console.log('hello');
    }, 500)
  }

  $scope.vm.gotoId = function(id) {
    var old = $location.hash();
    $location.hash(id);
    $anchorScroll();
    $location.hash(old);
  };
  $scope.htmlPopover = $sce.trustAsHtml('[This being 1993, the internet-based fantasy leagues of the present day were still a ways off. Instead, ‘drafting’ a team meant that you would pick one of five players from 15 different tiers ... and that was pretty much it, except for the three “trades” that you were allowed to make during the season, which you made by <i>calling into an automated system on a landline telephone and pressing a series of buttons </i> to indicate that you’d like to switch to a different player in one of the 15 tiers. There are zero people in the world who give you the “back in my day…” treatment and wax nostalgically for this era of fantasy basketball. Glory days, they were not.]');

  $scope.italyPopover = $sce.trustAsHtml('[Truth be told: having fulfilled all of my electives at USC prior to my semester in Florence -- and with Gonzaga not offering any accounting classes as part of their Italian curriculum -- there was no way for me to earn credit for the classes I was taking while abroad. Thus, my education while in Europe included courses of study such as: European Soccer 101, Principles of Rural Vespa Navigation, and Intro to Italian Nightlife.]');

}
