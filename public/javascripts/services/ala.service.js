angular
  .module('mySite')
  .factory('alaService', alaService)

function alaService ($http) {
  return {
    getFootballRecords: function(){
      return $http.get('javascripts/alarecords/football-records.json')
      .then(function(results){
        return results.data
      })
    },
    getHoopsRecords: function(){
      return $http.get('javascripts/alarecords/hoops-records.json')
      .then(function(results){
        return results.data
      })
    },
    getSurvivorResults: function(){
      return $http.get('javascripts/alapodiums/survivor-results.json')
      .then(function(results){
        return results.data
      })
    },
    getConfRecords: function(){
      return $http.get('javascripts/alarecords/confidence-records.json')
      .then(function(results){
        return results.data
      })
    },
    getNcaaRecords: function(){
      return $http.get('javascripts/alarecords/ncaa-records.json')
      .then(function(results){
        return results.data
      })
    },
    getHoopsPodium: function() {
      return $http.get('javascripts/alapodiums/hoops.json')
      .then(function(results){
        return results.data;
      })
    },
    getCdlPodium: function() {
      return $http.get('javascripts/alapodiums/cdl.json')
      .then(function(results){
        return results.data;
      })
    },
    getBaseballPodium: function() {
      return $http.get('javascripts/alapodiums/baseball.json')
      .then(function(results){
        return results.data;
      })
    },
    getPickemPodium: function() {
      return $http.get('javascripts/alapodiums/ncaapickem.json')
      .then(function(results){
        return results.data;
      })
    },
    getConfidencePodium: function() {
      return $http.get('javascripts/alapodiums/confidence.json')
      .then(function(results){
        return results.data;
      })
    },
    getMadnessPodium: function() {
      return $http.get('javascripts/alapodiums/madness.json')
      .then(function(results){
        return results.data;
      })
    },
    getGUFootballPodium: function() {
      return $http.get('javascripts/alapodiums/football_gu.json')
      .then(function(results){
        return results.data;
      })
    },
    getLOFootballPodium: function() {
      return $http.get('javascripts/alapodiums/football_lo.json')
      .then(function(results){
        return results.data;
      })
    },
    getSCFootballPodium: function() {
      return $http.get('javascripts/alapodiums/football_usc.json')
      .then(function(results){
        return results.data;
      })
    },
    getBtBPodium: function() {
      return $http.get('javascripts/alapodiums/btb.json')
      .then(function(results){
        return results.data;
      })
    },
    getBlogposts: function() {
      return $http.get('/blogposts')
      .then(function(results) {
        return results.data;
      })
    },
    getPost: function(titlestring) {
      return $http.get('/blogposts/' + titlestring)
      .then(function(results) {
        return results.data;
      })
    },
    addBlogpost: function(blogpost) {
      return $http.post('/blogposts', blogpost)
    }
  }
}
