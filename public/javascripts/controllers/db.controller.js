angular
  .module('mySite')
  .controller('DbController', ['dbService', DbController]);

function DbController (dbService) {
  var vm = this;
  vm.dbForm = {};
  vm.added = [];

  vm.getEntrants = function() {
    dbService.getEntrants().then(function(res){
      vm.entrants = res;
      console.log(vm.entrants);
    })
  }

  vm.addDbEntry = function() {
    dbService.addDbEntry(vm.dbForm).then(function(res){
      vm.added.push({
        buyin: res.buyin,
        entrant: res.entrant,
        game: res.game,
        opponents: res.opponents,
        prize: res.prize,
        rank: res.rank,
        season: res.season
      })
      vm.dbForm = {};
    })
  }
}
