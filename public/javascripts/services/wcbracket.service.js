angular
  .module('mySite')
  .factory('WCBracketService', WCBracketService)

function WCBracketService ($http) {
  return {
    getPicks: function(user) {
      return $http.get('wcbracket/picks/'+ user).then(function(res){
        return res.data;
      })
    },
    saveGroupPicks: function(picks) {
      return $http.put('wcbracket/saveGroupPicks', picks).then(function(res){
        return res.data;
      })
    },
    saveBracketPicks: function(picks) {
      return $http.put('wcbracket/saveBracketPicks', picks).then(function(res){
        console.log('returned to service is ', res.data);
        return res.data;
      })
    }
  }
}