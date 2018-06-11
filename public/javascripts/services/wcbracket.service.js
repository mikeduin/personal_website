angular
  .module('mySite')
  .factory('WCBracketService', WCBracketService)

function WCBracketService ($http) {
  return {
    getPicks: function(user) {
      return $http.get('wcbracket/picks/'+ user).then(function(res){
        return res.data;
      })
    }
  }
}
