angular
  .module('mySite', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', siteConfig])

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
          templateUrl: 'views/content.html'
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
          templateUrl: 'views/about.html'
        }
      }
    })
    .state('home.fridge', {
      url: 'mikesfridge',
      views: {
        'content@': {
          templateUrl: 'views/fridge.html'
        }
      }
    })
    .state('home.fridge.beer', {
      url: '/:beer',
      views: {
        'beer@home.fridge': {
          templateUrl: 'views/beerdisplay.html',
          controller: 'BeerController'
        }
      }
    })
    .state('home.ala', {
      url: 'ala',
      views: {
        'content@': {
          templateUrl: 'views/ala.html',
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
    .state('home.ala.survivor.records', {
      url: '/records',
      views: {
        'records@home.ala.survivor': {
          templateUrl: 'views/ala/survivor/records.html',
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
  }
