angular
  .module('mySite')
  .controller('WorldCupBracketController', ['$scope', '$state', WorldCupBracketController])

function WorldCupBracketController ($scope, $state) {
  console.log('controller is here');


  $scope.models = {
    selected: null,
    lists: {
      "Group A": [
        {
          "label": "Russia"
        },
        {
          "label": "Saudi Arabia"
        },
        {
          "label": "Egypt"
        },
        {
          "label": "Uruguay"
        }
      ]
    }
  };

  // // Generate initial model
  // for (var i = 1; i <= 3; ++i) {
  //     $scope.models.lists.A.push({label: "Item A" + i});
  //     $scope.models.lists.B.push({label: "Item B" + i});
  // }

  // Model to JSON for demo purpose
  // $scope.$watch('models', function(model) {
  //     $scope.modelAsJson = angular.toJson(model, true);
  // }, true);

  console.log($scope.models);
}
