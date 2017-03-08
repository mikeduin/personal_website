angular
  .module('mySite')
  .controller('DbController', ['dbService', '$scope', DbController]);

function DbController (dbService, $scope) {
  var vm = this;
  vm.dbForm = {};
  vm.added = [];

  vm.getEntrants = function() {
    dbService.getEntrants().then(function(res){
      vm.entrants = res;
      vm.entrants.unshift({
        name: "(all entrants)"
      });
    })
  }

  $scope.$watch('vm.entrants', function(){
    vm.sel_entrant = vm.entrants[0];
  })

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
  };

  vm.years = [2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001];

  vm.games = [
    'Fantasy MLB',
    'Fantasy NBA',
    'Fantasy NBA CDL',
    'Fantasy NFL',
    'FIFA World Cup Battle the Bookies',
    'FIFA World Cup Bracket Pool',
    'FIFA World Cup Survivor',
    'NBA All-Star Spectacular',
    'NBA Playoffs',
    'NFL Battle the Bookies',
    'NFL Confidence',
    'NFL Survivor',
    'NCAA March Madness',
    "NCAAF Pick'em'",
    "NCAAF Bowl Pick'em",
    'PGA Majors'
  ];
}
