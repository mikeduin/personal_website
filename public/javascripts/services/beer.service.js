angular
  .module('mySite')
  .factory('beerService', beerService)

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
    },
    addBeer: function(formData) {
      return $http.post('/beers', formData)
    },
    editBeer: function(beer) {
      return $http.put('/beers/' + beer.beername, beer)
    },
    deleteBeer: function(beer) {
      return $http({
        url: '/beers',
        method: 'DELETE',
        data: beer,
        headers: {"Content-Type": "application/json;charset=utf-8"}
      }).then(function(res) {
        console.log(res.data);
      }, function(error) {
        console.log(res.error);
      })
    }
  }
}
