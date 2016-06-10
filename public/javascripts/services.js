angular
  .module('mySite')
  .factory('spotifyService', spotifyService)
  .factory('beerService', beerService)
  .factory('alaService', alaService)

function spotifyService ($http) {
  return {
    getPlaylists: function() {
      return $http.get('https://api.spotify.com/v1/users/mike_duin/playlists')
      .then(function(results) {
        var playlists = results.data.data;
        return playlists
      })
    }
  }
}

function alaService ($http) {
  return {
    getHoopsPodium: function() {
      return $http.get('javascripts/alapodiums/hoops.json')
      .then(function(results){
        var podium = results.data;
        return podium
      })
    },
    getCdlPodium: function() {
      return $http.get('javascripts/alapodiums/cdl.json')
      .then(function(results){
        var podium = results.data;
        return podium
      })
    },
    getBaseballPodium: function() {
      return $http.get('javascripts/alapodiums/baseball.json')
      .then(function(results){
        var podium = results.data;
        return podium
      })
    },
    getPickemPodium: function() {
      return $http.get('javascripts/alapodiums/ncaapickem.json')
      .then(function(results){
        var podium = results.data;
        console.log(podium);
        return podium
      })
    },
    getGUFootballPodium: function() {
      return $http.get('javascripts/alapodiums/football_gu.json')
      .then(function(results){
        var podium = results.data;
        console.log(podium);
        return podium
      })
    },
    getLOFootballPodium: function() {
      return $http.get('javascripts/alapodiums/football_lo.json')
      .then(function(results){
        var podium = results.data;
        console.log(podium);
        return podium
      })
    },
    getSCFootballPodium: function() {
      return $http.get('javascripts/alapodiums/football_usc.json')
      .then(function(results){
        var podium = results.data;
        console.log(podium);
        return podium
      })
    }
  }
}

function beerService ($http) {
  return {
    getBeers: function() {
      return $http.get('/beers')
      .then(function(results) {
        var beers = results.data;
        return beers
      })
    },
    getBeer: function(beername) {
      return $http.get('/beers/' + beername)
      .then(function(results) {
        var beer = results.data;
        return beer
      })
    },
    getBreweries: function() {
      return $http.get('/beers')
      .then(function(results) {
        var breweries = [];
        var beers = results.data;
        for (var i in beers) {
          for (var j in beers[i].brewery) {
            if (breweries.indexOf(beers[i].brewery) === -1) {
              breweries.push(beers[i].brewery)
            }
          }
        }
        return breweries;
      })
    }
  }
}
