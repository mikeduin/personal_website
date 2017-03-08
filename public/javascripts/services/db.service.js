angular
  .module('mySite')
  .factory('dbService', dbService)

function dbService($http) {
  return {
    addDbEntry: function(formData) {
      return $http.post('/db/add', formData).then(function(res){
        return res.data;
      })
    },
    getEntrants: function() {
      return $http.get('/db/entrants').then(function(res){
        return res.data;
      })
    }
  }
}
