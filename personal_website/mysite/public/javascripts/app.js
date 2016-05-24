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
          templateUrl: 'views/header.html'
        },
        'content': {
          templateUrl: 'views/content.html'
        }
      }
    })
    .state('home.playlists', {
      url: '/',
      views: {
        '@content': {
          templateUrl: 'views/playlists.html'
        }
      }
    })
  }
