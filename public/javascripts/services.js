angular
  .module('mySite')
  .factory('spotifyService', spotifyService)
  .factory('beerService', beerService)

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
