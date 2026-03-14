angular
  .module('mySite')
  .factory('alaService', alaService)

function alaService ($http) {
  return {
    pullCareerData: () => {
      return $http.get(`/db/careerData`)
      .then(results => {
        return results.data;
      })
    },
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
      return $http.get('/users/userData/' + user).then(function(res){
        return res.data;
      })
    },
    contactCommish: function(contactForm){
      return $http.post('/contactCommish', contactForm)
      .then(function(result){
        return result.data;
      })
    },
    // generic helper to fetch podiums stored in DB
    getPodium: function(key) {
      return $http.get('/api/podiums/' + key)
      .then(function(results){
        var d = results.data;
        if (Array.isArray(d)) {
          if (d.length === 1) return d[0].data;
          return d.map(function(r){ return r.data; });
        }
        return d;
      })
    },
    // generic helper to fetch records stored in DB
    getRecord: function(key) {
      return $http.get('/api/records/' + key)
      .then(function(results){
        var d = results.data;
        if (Array.isArray(d)) {
          if (d.length === 1) return d[0].data;
          return d.map(function(r){ return r.data; });
        }
        return d;
      })
    },
    getSeasonData: function(key) {
      return $http.get('/api/season-data/' + key)
      .then(function(results){
        var d = results.data;
        if (Array.isArray(d)) {
          if (d.length === 1) return d[0].data;
          return d.map(function(r){ return r.data; });
        }
        return d;
      })
    },
    getChampions15: function() { return this.getPodium('champions15'); },
    getChampions16: function() { return this.getPodium('champions16'); },
    getChampions17: function() { return this.getPodium('champions17'); },
    getChampions18: function() { return this.getPodium('champions18'); },
    getChampions19: function() { return this.getPodium('champions19'); },
    getChampions20: function() { return this.getPodium('champions20'); },
    getChampions21: function() { return this.getPodium('champions21'); },
    getChampions22: function() { return this.getPodium('champions22'); },
    getChampions23: function() { return this.getPodium('champions23'); },
    getChampions24: function() { return this.getPodium('champions24'); },
    getChampionsTemp: function() { return this.getPodium('championsTemp'); },
    getPodiums: function() { return this.getPodium('hof-podiums'); },
    getTitles: function() { return this.getPodium('hof-titles'); },
    getPrizes: function() { return this.getPodium('hof-prizes'); },
    getEntries: function() { return this.getPodium('hof-entries'); },
    getNetProfits: function() { return this.getPodium('hof-netprofits'); },
    getFootballRecords: function(){ return this.getRecord('football-records'); },
    getHoopsRecords: function(){ return this.getRecord('hoops-records'); },
    getCdlRecords: function(){ return this.getRecord('cdl-records'); },
    getSurvivorResults: function(){ return this.getPodium('survivor-nfl'); },
    getSurvivorSeriesResults: function(){ return this.getPodium('survivor-series'); },
    getConfRecords: function(){ return this.getRecord('confidence-records'); },
    getNcaaRecords: function(){ return this.getRecord('ncaa-records'); },
    getMadnessRecords: function(){ return this.getRecord('madness-records'); },
    getBtbRecords: function(){ return this.getRecord('btb-records'); },
    getHoopsPodium: function() { return this.getPodium('hoops'); },
    getCdlPodium: function() { return this.getPodium('cdl'); },
    getBaseballPodium: function() { return this.getPodium('baseball'); },
    getPickemPodium: function() { return this.getPodium('ncaapickem'); },
    getConfidencePodium: function() { return this.getPodium('confidence'); },
    getCalcuttaPodium: function() { return this.getPodium('calcutta'); },
    getMadnessPodium: function() { return this.getPodium('madness'); },
    getGUFootballPodium: function() { return this.getPodium('football_gu'); },
    getLOFootballPodium: function() { return this.getPodium('football_lo'); },
    getSCFootballPodium: function() { return this.getPodium('football_usc'); },
    getBtBPodium: function() { return this.getPodium('btb'); },
    getFifaBracket: function() { return this.getPodium('fifa-bracket'); },
    getFifaBtb: function() { return this.getPodium('fifa-btb'); },
    getFifaSurvivor: function() { return this.getPodium('fifa-survivor'); },
    getNbaPlayoffs: function() { return this.getPodium('nba-playoffs'); },
    getPgaPodium: function() { return this.getPodium('pga'); },
    getBowlPodium: function() { return this.getPodium('bowl'); },
    getBowlRecords: function() { return this.getRecord('bowl-records'); },
    getPgaRecords: function() { return this.getRecord('pga-records'); },
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
        posts.forEach(post => {
          let tags = JSON.parse(post.tags);
          tags.forEach(tag => {
            if (!blogtags.includes(tag)) {blogtags.push(tag)}
          })
        })
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
