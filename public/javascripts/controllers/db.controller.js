angular
  .module('mySite')
  .controller('DbController', ['dbService', '$scope', DbController]);

function DbController (dbService, $scope) {
  var vm = this;
  vm.dbForm = {};
  vm.added = [];

  vm.dbQuery = function(){
    var entrant, game, year;
    if (vm.sel_entrant.name === '(all entrants)') {
      entrant = '*';
      vm.userChart = false;
    } else {
      entrant = vm.sel_entrant.name;
      vm.userChart = true;
    };
    if (vm.sel_game === undefined || vm.sel_game === '') {
      game = '*';
    } else {
      game = vm.sel_game;
    };
    if (vm.sel_year === undefined || vm.sel_year === '') {
      year = '*';
    } else {
      year = vm.sel_year;
    };
    if (entrant === '*' && game === '*' && year === '*') {
      vm.results = [];
      return;
    }
    dbService.dbQuery(entrant, game, year).then(function(res){
      console.log(res);
      vm.results = res.results;
      vm.userData = res.userData;
    })
  }

  vm.getEntrants = function() {
    dbService.getEntrants().then(function(res){
      vm.entrants = res;
      vm.entrants.unshift({
        name: "(all entrants)"
      });
    })
  };

  $scope.$watch('vm.entrants', function(){
    vm.sel_entrant = vm.entrants[0];
  });

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
    'Fantasy NFL [LO]',
    'Fantasy NFL [USC]',
    'Fantasy NFL [GU]',
    'FIFA World Cup Battle the Bookies',
    'FIFA World Cup Bracket Pool',
    'FIFA World Cup Survivor',
    'NBA All-Star Spectacular',
    'NBA Playoffs',
    'NFL Battle the Bookies',
    'NFL Confidence',
    'NFL Survivor',
    'NCAA March Madness',
    "NCAA Football Pick'em",
    "NCAA Football Bowl Pick'em",
    'PGA Majors'
  ];
}
