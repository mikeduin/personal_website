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
        return res.data;
      })
    },
    pullStandings: function() {
      return $http.get('wcbracket/standings').then(function(res){
        return res.data;
      })
    },
    getUserData: function (user) {
      return $http.get('wcbracket/user/' + user).then(function(res){
        return res.data;
      })
    },
    getUsernames: function() {
      return $http.get('wcbracket/usernames').then(function(res){
        return res.data;
      })
    },
    pullTeamStats: function() {
      return $http.get('wcbracket/teamstats').then(function(res){
        return res.data;
      })
    },
    calcGroups: function() {
      return $http.get('wcbracket/calcGroups').then(function(res){
        return res.data;
      })
    },
    pullResults: function() {
      return $http.get('wcbracket/results').then(function(res){
        return res.data;
      })
    },
    getFlags: function() {
      return $http.get('wcbracket/flags').then(function(res){
        return res.data;
      })
    }
  }
}
