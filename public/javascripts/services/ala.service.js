angular
  .module('mySite')
  .factory('alaService', alaService)

function alaService ($http) {
  return {
    retrievePools: function(){
      return $http.get('/retrievePools')
      .then(function(results){
        return results.data;
      })
    },
    poolRegister: function(data) {
      return $http.post('/poolRegister', data)
      .then(function(result){
        return result.data;
      })
    },
    getUser: function (user) {
      return $http.get('/user/' + user).then(function(res){
        return res.data;
      })
    },
    contactCommish: function(contactForm){
      return $http.post('/contactCommish', contactForm)
      .then(function(result){
        return result.data;
      })
    },
    getChampions15: function() {
      return $http.get('javascripts/alapodiums/champions15.json')
      .then(function(results){
        return results.data;
      })
    },
    getChampions16: function() {
      return $http.get('javascripts/alapodiums/champions16.json')
      .then(function(results){
        return results.data;
      })
    },
    getChampions17: function() {
      return $http.get('javascripts/alapodiums/champions17.json')
      .then(function(results){
        return results.data;
      })
    },
    getChampions18: function() {
      return $http.get('javascripts/alapodiums/champions18.json')
      .then(function(results){
        return results.data;
      })
    },
    getChampions19: function() {
      return $http.get('javascripts/alapodiums/champions19.json')
      .then(function(results){
        return results.data;
      })
    },
    getPodiums: function() {
      return $http.get('javascripts/alapodiums/hof-podiums.json')
      .then(function(results){
        return results.data;
      })
    },
    getTitles: function() {
      return $http.get('javascripts/alapodiums/hof-titles.json')
      .then(function(results){
        return results.data;
      })
    },
    getPrizes: function() {
      return $http.get('javascripts/alapodiums/hof-prizes.json')
      .then(function(results){
        return results.data;
      })
    },
    getEntries: function() {
      return $http.get('javascripts/alapodiums/hof-entries.json')
      .then(function(results){
        return results.data;
      })
    },
    getNetProfits: function() {
      return $http.get('javascripts/alapodiums/hof-netprofits.json')
      .then(function(results){
        return results.data;
      })
    },
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
    getCdlRecords: function(){
      return $http.get('javascripts/alarecords/cdl-records.json')
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
    getMadnessRecords: function(){
      return $http.get('javascripts/alarecords/madness-records.json')
      .then(function(results){
        return results.data
      })
    },
    getBtbRecords: function(){
      return $http.get('javascripts/alarecords/btb-records.json')
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
    getCalcuttaPodium: function() {
      return $http.get('javascripts/alapodiums/calcutta.json')
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
    getFifaBracket: function() {
      return $http.get('javascripts/alapodiums/fifa-bracket.json')
      .then(function(results){
        return results.data;
      })
    },
    getFifaBtb: function() {
      return $http.get('javascripts/alapodiums/fifa-btb.json')
      .then(function(results){
        return results.data;
      })
    },
    getFifaSurvivor: function() {
      return $http.get('javascripts/alapodiums/fifa-survivor.json')
      .then(function(results){
        return results.data;
      })
    },
    getNbaPlayoffs: function() {
      return $http.get('javascripts/alapodiums/nba-playoffs.json')
      .then(function(results){
        return results.data;
      })
    },
    getPgaPodium: function() {
      return $http.get('javascripts/alapodiums/pga.json')
      .then(function(results){
        return results.data;
      })
    },
    getBowlPodium: function() {
      return $http.get('javascripts/alapodiums/bowl.json')
      .then(function(results){
        return results.data;
      })
    },
    getBowlRecords: function() {
      return $http.get('javascripts/alarecords/bowl-records.json')
      .then(function(results){
        return results.data;
      })
    },
    getPgaRecords: function() {
      return $http.get('javascripts/alarecords/pga-records.json')
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
    getBlogtags: function() {
      return $http.get('/blogposts')
      .then(function(results) {
        var blogtags = [];
        var posts = results.data;
        for (var i in posts) {
          for (var j in posts[i].tags) {
            for (var k in posts[i].tags[j]) {
              var blogtag = posts[i].tags[j];
              if (blogtags.indexOf(blogtag) === -1) {
                blogtags.push(blogtag)
              }
            }
          }
        }
        blogtags.sort();
        return blogtags;
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
