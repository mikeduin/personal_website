angular
  .module('mySite', [
    'ui.router',
    'zingchart-angularjs',
    'ui.bootstrap',
    'ngAnimate'])
  .run(['$anchorScroll', function($anchorScroll) {
  $anchorScroll.yOffset = 80;
    }])
  .config(['$stateProvider', '$urlRouterProvider', siteConfig])
  // .config(['$locationProvider', function($locationProvider) {
  //   $locationProvider.html5Mode(true);
  // }])



function siteConfig ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      views: {
        'header': {
          templateUrl: 'views/header.html',
          controller: 'MainController'
        },
        'content': {
          templateUrl: 'views/content.html',
          controller: 'MainController'
        }
      }
    })
    .state('home.music', {
      url: 'music',
      views: {
        'content@': {
          templateUrl: 'views/music.html',
          controller: 'MusicController'
        }
      }
    })
    .state('home.professional', {
      url: 'professional',
      views: {
        'content@': {
          templateUrl: 'views/professional.html'
        }
      }
    })
    .state('home.about', {
      url: 'about',
      views: {
        'content@': {
          templateUrl: 'views/about.html',
          controller: 'MainController'
        }
      }
    })
    .state('home.fridge', {
      url: 'mikesfridge',
      views: {
        'content@': {
          templateUrl: 'views/fridge.html',
          controller: 'BeerController'
        }
      }
    })
    .state('home.fridge.addbeer', {
      url: '/addabeer',
      views: {
        'addbeer@home.fridge': {
          templateUrl: 'views/fridge/addbeer.html',
          controller: 'BeerController'
        }
      }
    })
    .state('home.fridge.beer', {
      url: '/:beername',
      views: {
        'beerdisplay@home.fridge': {
          templateUrl: 'views/fridge/beer.html',
          controller: 'BeerController'
        }
      }
    })
    .state('home.fridge.edit', {
      url: '/:beername/edit',
      views: {
        'edit@home.fridge': {
          templateUrl: 'views/fridge/edit.html',
          controller: 'BeerController'
        }
      }
    })
    .state('home.ala', {
      url: 'alevelabove',
      views: {
        'content@': {
          templateUrl: 'views/ala.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.about', {
      url: '/about',
      views: {
        'about@home.ala': {
          templateUrl: 'views/ala/about.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.blog', {
      url: '/blog',
      views: {
        'blog@home.ala': {
          templateUrl: 'views/ala/blog.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.blog.main', {
      url: '/main',
      views: {
        'main@home.ala.blog': {
          templateUrl: 'views/ala/blog/main.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.blog.add', {
      url: '/add',
      views: {
        'add@home.ala.blog': {
          templateUrl: 'views/ala/blog/add.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.blog.post', {
      url: '/:titlestring',
      views: {
        'post@home.ala.blog': {
          templateUrl: 'views/ala/blog/post.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.buyins', {
      url: '/buyins',
      views: {
        'buyins@home.ala': {
          templateUrl: 'views/ala/buyins.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.hoops', {
      url: '/hoops',
      views: {
        'hoops@home.ala': {
          templateUrl: 'views/ala/hoops/main.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.hoops.details', {
      url: '/home',
      views: {
        'details@home.ala.hoops': {
          templateUrl: 'views/ala/hoops/details.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.hoops.rankings', {
      url: '/rankings',
      views: {
        'rankings@home.ala.hoops': {
          templateUrl: 'views/ala/hoops/rankings.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.hoops.records', {
      url: '/records',
      views: {
        'records@home.ala.hoops': {
          templateUrl: 'views/ala/hoops/records.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.hoops.podium', {
      url: '/podium',
      views: {
        'podium@home.ala.hoops': {
          templateUrl: 'views/ala/hoops/podium.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.nbacdl', {
      url: '/nbacdl',
      views: {
        'nbacdl@home.ala': {
          templateUrl: 'views/ala/nbacdl/main.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.nbacdl.details', {
      url: '/home',
      views: {
        'details@home.ala.nbacdl': {
          templateUrl: 'views/ala/nbacdl/details.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.nbacdl.rankings', {
      url: '/rankings',
      views: {
        'rankings@home.ala.nbacdl': {
          templateUrl: 'views/ala/nbacdl/rankings.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.nbacdl.records', {
      url: '/records',
      views: {
        'records@home.ala.nbacdl': {
          templateUrl: 'views/ala/nbacdl/records.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.nbacdl.constitution', {
      url: '/constitution',
      views: {
        'constitution@home.ala.nbacdl': {
          templateUrl: 'views/ala/nbacdl/constitution.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.nbacdl.podium', {
      url: '/podium',
      views: {
        'podium@home.ala.nbacdl': {
          templateUrl: 'views/ala/nbacdl/podium.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.baseball', {
      url: '/baseball',
      views: {
        'baseball@home.ala': {
          templateUrl: 'views/ala/baseball/main.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.baseball.details', {
      url: '/home',
      views: {
        'details@home.ala.baseball': {
          templateUrl: 'views/ala/baseball/details.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.baseball.rankings', {
      url: '/rankings',
      views: {
        'rankings@home.ala.baseball': {
          templateUrl: 'views/ala/baseball/rankings.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.baseball.records', {
      url: '/records',
      views: {
        'records@home.ala.baseball': {
          templateUrl: 'views/ala/baseball/records.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.baseball.podium', {
      url: '/podium',
      views: {
        'podium@home.ala.baseball': {
          templateUrl: 'views/ala/baseball/podium.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.football', {
      url: '/football',
      views: {
        'football@home.ala': {
          templateUrl: 'views/ala/football/main.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.football.details', {
      url: '/home',
      views: {
        'details@home.ala.football': {
          templateUrl: 'views/ala/football/details.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.football.rankings', {
      url: '/rankings',
      views: {
        'rankings@home.ala.football': {
          templateUrl: 'views/ala/football/rankings.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.football.records', {
      url: '/records',
      views: {
        'records@home.ala.football': {
          templateUrl: 'views/ala/football/records.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.football.podium', {
      url: '/podium',
      views: {
        'podium@home.ala.football': {
          templateUrl: 'views/ala/football/podium.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.ncaapickem', {
      url: '/ncaapickem',
      views: {
        'ncaapickem@home.ala': {
          templateUrl: 'views/ala/ncaapickem/main.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.ncaapickem.details', {
      url: '/home',
      views: {
        'details@home.ala.ncaapickem': {
          templateUrl: 'views/ala/ncaapickem/details.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.ncaapickem.rankings', {
      url: '/rankings',
      views: {
        'rankings@home.ala.ncaapickem': {
          templateUrl: 'views/ala/ncaapickem/rankings.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.ncaapickem.yoy', {
      url: '/yoy',
      views: {
        'yoy@home.ala.ncaapickem': {
          templateUrl: 'views/ala/ncaapickem/yoy.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.ncaapickem.records', {
      url: '/records',
      views: {
        'records@home.ala.ncaapickem': {
          templateUrl: 'views/ala/ncaapickem/records.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.ncaapickem.podium', {
      url: '/podium',
      views: {
        'podium@home.ala.ncaapickem': {
          templateUrl: 'views/ala/ncaapickem/podium.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.bowlpickem', {
      url: '/bowlpickem',
      views: {
        'bowlpickem@home.ala': {
          templateUrl: 'views/ala/bowlpickem/main.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.bowlpickem.details', {
      url: '/home',
      views: {
        'details@home.ala.bowlpickem': {
          templateUrl: 'views/ala/bowlpickem/details.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.bowlpickem.rankings', {
      url: '/rankings',
      views: {
        'rankings@home.ala.bowlpickem': {
          templateUrl: 'views/ala/bowlpickem/rankings.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.bowlpickem.yoy', {
      url: '/yoy',
      views: {
        'yoy@home.ala.bowlpickem': {
          templateUrl: 'views/ala/bowlpickem/yoy.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.bowlpickem.records', {
      url: '/records',
      views: {
        'records@home.ala.bowlpickem': {
          templateUrl: 'views/ala/bowlpickem/records.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.bowlpickem.podium', {
      url: '/podium',
      views: {
        'podium@home.ala.bowlpickem': {
          templateUrl: 'views/ala/bowlpickem/podium.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.survivor', {
      url: '/nflsurvivor',
      views: {
        'survivor@home.ala': {
          templateUrl: 'views/ala/survivor/main.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.survivor.details', {
      url: '/home',
      views: {
        'details@home.ala.survivor': {
          templateUrl: 'views/ala/survivor/details.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.survivor.winners', {
      url: '/winners',
      views: {
        'winners@home.ala.survivor': {
          templateUrl: 'views/ala/survivor/winners.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.survivor.rankings', {
      url: '/rankings',
      views: {
        'rankings@home.ala.survivor': {
          templateUrl: 'views/ala/survivor/rankings.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.survivor.yoy', {
      url: '/yoy',
      views: {
        'yoy@home.ala.survivor': {
          templateUrl: 'views/ala/survivor/yoy.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.btb', {
      url: '/battlethebookies',
      views: {
        'btb@home.ala': {
          templateUrl: 'views/ala/btb/main.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.btb.details', {
      url: '/home',
      views: {
        'details@home.ala.btb': {
          templateUrl: 'views/ala/btb/details.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.btb.rankings', {
      url: '/rankings',
      views: {
        'rankings@home.ala.btb': {
          templateUrl: 'views/ala/btb/rankings.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.btb.yoy', {
      url: '/yoy',
      views: {
        'yoy@home.ala.btb': {
          templateUrl: 'views/ala/btb/yoy.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.btb.records', {
      url: '/records',
      views: {
        'records@home.ala.btb': {
          templateUrl: 'views/ala/btb/records.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.btb.podium', {
      url: '/podium',
      views: {
        'podium@home.ala.btb': {
          templateUrl: 'views/ala/btb/podium.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.confidence', {
      url: '/nflconfidence',
      views: {
        'confidence@home.ala': {
          templateUrl: 'views/ala/confidence/main.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.confidence.details', {
      url: '/home',
      views: {
        'details@home.ala.confidence': {
          templateUrl: 'views/ala/confidence/details.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.confidence.rankings', {
      url: '/rankings',
      views: {
        'rankings@home.ala.confidence': {
          templateUrl: 'views/ala/confidence/rankings.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.confidence.yoy', {
      url: '/yoy',
      views: {
        'yoy@home.ala.confidence': {
          templateUrl: 'views/ala/confidence/yoy.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.confidence.records', {
      url: '/records',
      views: {
        'records@home.ala.confidence': {
          templateUrl: 'views/ala/confidence/records.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.confidence.podium', {
      url: '/podium',
      views: {
        'podium@home.ala.confidence': {
          templateUrl: 'views/ala/confidence/podium.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.madness', {
      url: '/madness',
      views: {
        'madness@home.ala': {
          templateUrl: 'views/ala/madness/main.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.madness.details', {
      url: '/home',
      views: {
        'details@home.ala.madness': {
          templateUrl: 'views/ala/madness/details.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.madness.rankings', {
      url: '/rankings',
      views: {
        'rankings@home.ala.madness': {
          templateUrl: 'views/ala/madness/rankings.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.madness.yoy', {
      url: '/yoy',
      views: {
        'yoy@home.ala.madness': {
          templateUrl: 'views/ala/madness/yoy.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.madness.records', {
      url: '/records',
      views: {
        'records@home.ala.madness': {
          templateUrl: 'views/ala/madness/records.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.madness.podium', {
      url: '/podium',
      views: {
        'podium@home.ala.madness': {
          templateUrl: 'views/ala/madness/podium.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.fifa', {
      url: '/fifa',
      views: {
        'fifa@home.ala': {
          templateUrl: 'views/ala/fifa/main.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.fifa.details', {
      url: '/details',
      views: {
        'details@home.ala.fifa': {
          templateUrl: 'views/ala/fifa/details.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.fifa.survivor', {
      url: '/survivor',
      views: {
        'survivor@home.ala.fifa': {
          templateUrl: 'views/ala/fifa/survivor.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.fifa.bracket', {
      url: '/bracket',
      views: {
        'bracket@home.ala.fifa': {
          templateUrl: 'views/ala/fifa/bracket.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.fifa.btb', {
      url: '/btb',
      views: {
        'btb@home.ala.fifa': {
          templateUrl: 'views/ala/fifa/btb.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.pga', {
      url: '/pgamajors',
      views: {
        'pga@home.ala': {
          templateUrl: 'views/ala/pga/main.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.pga.details', {
      url: '/details',
      views: {
        'details@home.ala.pga': {
          templateUrl: 'views/ala/pga/details.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.pga.podium', {
      url: '/podium',
      views: {
        'podium@home.ala.pga': {
          templateUrl: 'views/ala/pga/podium.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.pga.records', {
      url: '/records',
      views: {
        'records@home.ala.pga': {
          templateUrl: 'views/ala/pga/records.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.pga.rankings', {
      url: '/rankings',
      views: {
        'rankings@home.ala.pga': {
          templateUrl: 'views/ala/pga/rankings.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.pga.yoy', {
      url: '/yoy',
      views: {
        'yoy@home.ala.pga': {
          templateUrl: 'views/ala/pga/yoy.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.nbaplayoffs', {
      url: '/nbaplayoffs',
      views: {
        'nbaplayoffs@home.ala': {
          templateUrl: 'views/ala/nbaplayoffs/main.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.nbaplayoffs.details', {
      url: '/details',
      views: {
        'details@home.ala.nbaplayoffs': {
          templateUrl: 'views/ala/nbaplayoffs/details.html',
          controller: 'AlaController'
        }
      }
    })
    .state('home.ala.nbaplayoffs.results', {
      url: '/results',
      views: {
        'results@home.ala.nbaplayoffs': {
          templateUrl: 'views/ala/nbaplayoffs/results.html',
          controller: 'AlaController'
        }
      }
    })
  }
