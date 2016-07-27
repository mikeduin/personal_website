angular
  .module('mySite')
  .controller('MainController', ['$scope', '$state', '$sce', MainController])

function MainController ($scope, $state, $sce){
  $scope.$state = $state;
  $scope.htmlPopover = $sce.trustAsHtml('[This being 1993, the internet-based fantasy leagues of the present day were still a ways off. Instead, ‘drafting’ a team meant that you would pick one of five players from 15 different tiers ... and that was pretty much it, except for the three “trades” that you were allowed to make during the season, which you made by <i>calling into an automated system on a landline telephone and pressing a series of buttons </i> to indicate that you’d like to switch to a different player in one of the 15 tiers. There are zero people in the world who give you the “back in my day…” treatment and hark nostalgically for this era of fantasy basketball. Glory days, they were not.]');
}
