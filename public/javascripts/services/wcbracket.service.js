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
      return $http.put(`wcbracket/saveGroupPicks`, picks).then(function(res){
        return res.data;
      })
    },
    saveBracketPicks: function(picks) {
      return $http.put('wcbracket/saveBracketPicks', picks).then(function(res){
        return res.data;
      })
    },
    pullStandings: function(season) {
      return $http.get(`wcbracket/standings/${season}`).then(function(res){
        return res.data;
      })
    },
    // getUserData: function (user) {
    //   return $http.get('wcbracket/user/' + user).then(function(res){
    //     console.log('response from getUserData is ', getUserData);
    //     return res.data;
    //   })
    // },
    getUsernames: function() {
      return $http.get('wcbracket/usernames').then(function(res){
        return res.data;
      })
    },
    pullTeamStats: (season) => {
      return $http.get(`wcbracket/teamstats/${season}`).then(function(res){
        return res.data;
      })
    },
    calcGroups: function(season) {
      return $http.get(`wcbracket/calcGroups/${season}`).then(function(res){
        return res.data;
      })
    },
    calcBrackets: function (season) {
      return $http.get(`wcbracket/calcBrackets/${season}`).then(function(res){
        return res.data;
      })
    },
    calcStandings: function(season) {
      return $http.get(`wcbracket/calcStandings/${season}`).then(function(res){
        return res.data;
      })
    },
    fetchStandings: season => {
      return $http.get(`wcbracket/fetchStandings/${season}`).then(function(res){
        console.log('res in fetch standings is ', res);
        return res.data;
      })
    },
    fetchBracketWs: function () {
      return $http.get('wcbracket/bracketWinners').then(function(res){
        return res.data;
      })
    },
    pullResults: function(season) {
      return $http.get(`wcbracket/results/${season}`).then(function(res){
        return res.data;
      })
    },
    getFlags: function() {
      return $http.get('wcbracket/flags').then(function(res){
        return res.data;
      })
    },
    getAdvancing: function() {
      return $http.get('wcbracket/advancing').then(function(res){
        return res.data;
      })
    }
  }
}
