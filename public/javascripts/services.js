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
    }
  }
}
