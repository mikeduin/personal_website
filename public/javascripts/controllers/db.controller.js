angular
  .module('mySite')
  .controller('DbController', ['dbService', DbController]);

function DbController (dbService) {
  var vm = this;
  vm.dbForm = {};
  vm.added = [];

  vm.addDbEntry = function() {
    dbService.addDbEntry(vm.dbForm).then(function(result){
      vm.added.push({
        buyin: result.buyin,
        entrant: result.entrant,
        game: result.game,
        opponents: result.opponents,
        prize: result.prize,
        rank: result.rank,
        season: result.season
      })
      vm.dbForm = {};
    })
  }
}
