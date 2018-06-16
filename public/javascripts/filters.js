angular
  .module('mySite')
  .filter('percentage', ['$filter', pctFilter])
  .filter('rawHtml', ['$sce', function($sce){
    return function(val) {
      return $sce.trustAsHtml(val);
    };
  }])

function pctFilter ($filter) {
  return function (input, decimals) {
    return $filter('number')(input*100, decimals) + '%';
  }
}
