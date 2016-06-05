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
    .state('home.fridge', {
      url: 'mikesfridge',
      views: {
        'content@': {
          templateUrl: 'views/fridge.html'
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
    .state('home.about', {
      url: 'about',
      views: {
        'content@': {
          templateUrl: 'views/about.html'
        }
      }
    })
  }
