angular
  .module('mySite')
  .factory('dbService', dbService)

function dbService($http) {
  return {
    addDbEntry: function(formData) {
      return $http.post('/db/add', formData).then(function(response){
        return response.data;
      })
    }
  }
}
