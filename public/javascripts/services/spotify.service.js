angular
  .module('mySite')
  .factory('spotifyService', spotifyService)

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
