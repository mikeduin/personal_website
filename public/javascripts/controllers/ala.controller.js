angular
  .module('mySite')
  .controller('AlaController', ['$scope', '$anchorScroll', '$location', 'alaService', '$state', '$stateParams', AlaController])

function AlaController ($scope, $anchorScroll, $location, alaService, $state, $stateParams) {
  $scope.$state = $state;
  $scope.vm = {};
  $scope.vm.sortOrder = '-date';
  $scope.vm.blogposts = [];
  $scope.vm.post = {};
  $scope.vm.newpost = {};
  $scope.vm.blogtags = [];
  $scope.contactForm = {};
  $scope.vm.contactSuccess = false;

  $scope.$on('$stateChangeSuccess', function(){
    document.body.scrollTop = document.documentElement.scrollTop=0;
  })

  $scope.showFantasyNBA = false;
  $scope.showAlaHoops = false;
  $scope.showAlaCdl = false;
  $scope.showMadness = false;
  $scope.showNcaaPickem = false;
  $scope.showBowlPickem = false;
  $scope.showBtb = false;
  $scope.showBaseball = false;
  $scope.showEffRoto = false;
  $scope.showFootball = false;
  $scope.showSurvivor = false;
  $scope.showConfidence = false;
  $scope.showPga = false;
  $scope.showNbaPlayoffs = false;
  $scope.showFifa = false;

  $scope.vm.menuDisplay = function(click){
    var displays = ['showFantasyNBA', 'showMadness', 'showNcaaPickem', 'showBowlPickem', 'showBtb', 'showBaseball', 'showFootball', 'showSurvivor', 'showConfidence', 'showPga', 'showNbaPlayoffs', 'showFifa'];

    for (var i=0; i<displays.length; i++) {
      if (click === displays[i]) {
        $scope[displays[i]] = !$scope[displays[i]]
      } else {
        $scope[displays[i]] = false
      }
    }
  }

  $scope.vm.hoopsDisplay = function(click){
    var displays = ['showAlaHoops', 'showAlaCdl'];

    for (var i=0; i<displays.length; i++) {
      if (click === displays[i]) {
        $scope[displays[i]] = !$scope[displays[i]]
      } else {
        $scope[displays[i]] = false
      }
    }

  }

  $scope.vm.contactCommish = function(){
    alaService.contactCommish($scope.contactForm).then(function(result){
      $scope.contactForm = {};
      $scope.vm.contactSuccess = true;
    })
  }

  $scope.vm.gotoId = function(id) {
    var old = $location.hash();
    $location.hash(id);
    $anchorScroll();
    $location.hash(old);
  };

  $scope.getBlogposts = function() {
    alaService.getBlogposts().then(function(blogposts){
      $scope.vm.blogposts = blogposts;
    })
  };
  $scope.getBlogposts();

  $scope.getBlogtags = function() {
    alaService.getBlogtags().then(function(tags){
      $scope.vm.blogtags = tags;
    })
  }
  $scope.getBlogtags();

  $scope.getPost = function(){
    alaService.getPost($stateParams.titlestring).then(function(post){
      $scope.vm.post = post[0];
    })
  }
  $scope.getPost();

  $scope.vm.addBlogpost = function() {
    alaService.addBlogpost($scope.vm.newpost).then(function(){
      $state.go('home.ala.blog.main');
      $scope.vm.newpost = {};
      console.log('new blogpost has been added!')
    })
  };

  $scope.vm.podiums = {};
  $scope.getPodiums = function() {
    alaService.getPodiums().then(function(results){
      $scope.vm.podiums = results;
    })
  };
  $scope.getPodiums();

  $scope.vm.champions15 = {};
  $scope.getChampions15 = function() {
    alaService.getChampions15().then(function(results){
      $scope.vm.champions15 = results;
    })
  };
  $scope.getChampions15();

  $scope.vm.champions16 = {};
  $scope.getChampions16 = function() {
    alaService.getChampions16().then(function(results){
      $scope.vm.champions16 = results;
    })
  };
  $scope.getChampions16();

  $scope.vm.titles = {};
  $scope.getTitles = function() {
    alaService.getTitles().then(function(results){
      $scope.vm.titles = results;
    })
  };
  $scope.getTitles();

  $scope.vm.prizes = {};
  $scope.getPrizes = function() {
    alaService.getPrizes().then(function(results){
      $scope.vm.prizes = results;
    })
  };
  $scope.getPrizes();

  $scope.vm.netProfits = {};
  $scope.getNetProfits = function() {
    alaService.getNetProfits().then(function(results){
      $scope.vm.netProfits = results;
    })
  };
  $scope.getNetProfits();

  $scope.vm.entries = {};
  $scope.getEntries = function() {
    alaService.getEntries().then(function(results){
      $scope.vm.entries = results;
    })
  };
  $scope.getEntries();

  $scope.vm.hoopsPodium = {};
  $scope.getHoopsPodium = function() {
    alaService.getHoopsPodium().then(function(results){
      $scope.vm.hoopsPodium = results;
    })
  };
  $scope.getHoopsPodium();

  $scope.vm.cdlPodium = {};
  $scope.getCdlPodium = function() {
    alaService.getCdlPodium().then(function(results){
      $scope.vm.cdlPodium = results;
    })
  };
  $scope.getCdlPodium();

  $scope.vm.baseballPodium = {};
  $scope.getBaseballPodium = function() {
    alaService.getBaseballPodium().then(function(results){
      $scope.vm.baseballPodium = results;
    })
  };
  $scope.getBaseballPodium();

  $scope.vm.SCFootballPodium = {};
  $scope.getSCFootballPodium = function() {
    alaService.getSCFootballPodium().then(function(results){
      $scope.vm.SCFootballPodium = results;
    })
  };
  $scope.getSCFootballPodium();

  $scope.vm.LOFootballPodium = {};
  $scope.getLOFootballPodium = function() {
    alaService.getLOFootballPodium().then(function(results){
      $scope.vm.LOFootballPodium = results;
    })
  };
  $scope.getLOFootballPodium();

  $scope.vm.GUFootballPodium = {};
  $scope.getGUFootballPodium = function() {
    alaService.getGUFootballPodium().then(function(results){
      $scope.vm.GUFootballPodium = results;
    })
  };
  $scope.getGUFootballPodium();

  $scope.vm.pickemPodium = {};
  $scope.getPickemPodium = function() {
    alaService.getPickemPodium().then(function(results){
      $scope.vm.pickemPodium = results;
    })
  };
  $scope.getPickemPodium();

  $scope.vm.btbPodium = {};
  $scope.getBtBPodium = function() {
    alaService.getBtBPodium().then(function(results){
      $scope.vm.btbPodium = results;
    })
  };
  $scope.getBtBPodium();

  $scope.vm.confidencePodium = {};
  $scope.getConfidencePodium = function() {
    alaService.getConfidencePodium().then(function(results){
      $scope.vm.confidencePodium = results;
    })
  };
  $scope.getConfidencePodium();

  $scope.vm.madnessPodium = {};
  $scope.getMadnessPodium = function() {
    alaService.getMadnessPodium().then(function(results){
      $scope.vm.madnessPodium = results;
    })
  };
  $scope.getMadnessPodium();

  $scope.vm.bowlPodium = {};
  $scope.getBowlPodium = function() {
    alaService.getBowlPodium().then(function(results){
      $scope.vm.bowlPodium = results;
    })
  };
  $scope.getBowlPodium();

  $scope.vm.nbaPlayoffs = {};
  $scope.getNbaPlayoffs = function() {
    alaService.getNbaPlayoffs().then(function(results){
      $scope.vm.nbaPlayoffs = results;
    })
  };
  $scope.getNbaPlayoffs();

  $scope.vm.pgaPodium = {};
  $scope.getPgaPodium = function() {
    alaService.getPgaPodium().then(function(results){
      $scope.vm.pgaPodium = results;
    })
  };
  $scope.getPgaPodium();

  $scope.vm.fifaBracket = {};
  $scope.getFifaBracket = function() {
    alaService.getFifaBracket().then(function(results){
      $scope.vm.fifaBracket = results;
    })
  };
  $scope.getFifaBracket();

  $scope.vm.fifaBtb = {};
  $scope.getFifaBtb = function() {
    alaService.getFifaBtb().then(function(results){
      $scope.vm.fifaBtb = results;
    })
  };
  $scope.getFifaBtb();

  $scope.vm.fifaSurvivor = {};
  $scope.getFifaSurvivor = function() {
    alaService.getFifaSurvivor().then(function(results){
      $scope.vm.fifaSurvivor = results;
    })
  };
  $scope.getFifaSurvivor();

  $scope.vm.footballRecords = {};
  $scope.getFootballRecords = function(){
    alaService.getFootballRecords().then(function(results){
      $scope.vm.footballRecords = results;
    })
  };
  $scope.getFootballRecords();

  $scope.vm.hoopsRecords = {};
  $scope.getHoopsRecords = function(){
    alaService.getHoopsRecords().then(function(results){
      $scope.vm.hoopsRecords = results;
    })
  };
  $scope.getHoopsRecords();

  $scope.vm.survivorResults = {};
  $scope.getSurvivorResults = function(){
    alaService.getSurvivorResults().then(function(results){
      $scope.vm.survivorResults = results;
    })
  };
  $scope.getSurvivorResults();

  $scope.vm.confRecords = {};
  $scope.getConfRecords = function(){
    alaService.getConfRecords().then(function(results){
      $scope.vm.confRecords = results;
    })
  };
  $scope.getConfRecords();

  $scope.vm.ncaaRecords = {};
  $scope.getNcaaRecords = function(){
    alaService.getNcaaRecords().then(function(results){
      $scope.vm.ncaaRecords = results;
    })
  };
  $scope.getNcaaRecords();

  $scope.vm.madnessRecords = {};
  $scope.getMadnessRecords = function(){
    alaService.getMadnessRecords().then(function(results){
      $scope.vm.madnessRecords = results;
    })
  };
  $scope.getMadnessRecords();

  $scope.vm.pgaRecords = {};
  $scope.getPgaRecords = function() {
    alaService.getPgaRecords().then(function(results){
      $scope.vm.pgaRecords = results;
    })
  };
  $scope.getPgaRecords();

  $scope.vm.btbRecords = {};
  $scope.getBtbRecords = function() {
    alaService.getBtbRecords().then(function(results){
      $scope.vm.btbRecords = results;
    })
  };
  $scope.getBtbRecords();

  $scope.vm.cdlRecords = {};
  $scope.getCdlRecords = function() {
    alaService.getCdlRecords().then(function(results){
      $scope.vm.cdlRecords = results;
    })
  };
  $scope.getCdlRecords();

  $scope.vm.bowlRecords = {};
  $scope.getBowlRecords = function() {
    alaService.getBowlRecords().then(function(results){
      $scope.vm.bowlRecords = results;
    })
  };
  $scope.getBowlRecords();

  $scope.vm.madnessData = {
    'type':'line',
    'title': {
      'text':'March Madness Prize Pools',
      "fontFamily": "Raleway"
    },
    'plot':{
      'aspect': 'spline',
      'line-width': 5,
      'marker': {
        'background-color': '#337AB7',
        'size': 7,
        'border-color': '#DC5623',
        'border-width': 1
      }
    },
    'scaleX':{
      'values': [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      'offset-y': 4,
    },
    'scaleY':{
      'format': '$%v'
    },
    'tooltip':{
      'text': '%kl: $%v'
    },
    'legend':{
      "layout":"1x1", //row x column
      "x":"10%",
      "y":"5%",
    },
    'series':[
      {
        "values": [660, 1134, 1510, 1680, 2110, 3540, 5423, 6511, 6675],
        "type": 'line',
        "line-color": "#DC5623",
        'legend-text': 'Prize $',
        "animation": {
          "delay":10,
          "effect":5,
          "speed":"2000"
        },
        "valueBox": {
          "placement": 'top',
          "text": '$%v',
          "fontFamily": "Raleway",
          "font-size": 18,
          "color": '#3984C5',
          "shadow": true,
          "offset-y": -8
        }
      }
    ]
  };

  $scope.vm.confidenceData = {
    'type':'line',
    'title': {
      'text':'NFL Confidence Prize Pools',
      "fontFamily": "Raleway"
    },
    'plot':{
      'aspect': 'spline',
      'line-width': 5,
      'marker': {
        'background-color': '#337AB7',
        'size': 7,
        'border-color': '#DC5623',
        'border-width': 1
      }
    },
    'scaleX':{
      'values': [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
      'offset-y': 4,
    },
    'scaleY':{
      'format': '$%v'
    },
    'tooltip':{
      'text': '%kl: $%v'
    },
    'legend':{
      "layout":"1x1", //row x column
      "x":"10%",
      "y":"5%",
    },
    'series':[
      {
        "values": [675, 810, 780, 930, 1120, 890, 1840, 2430, 1690],
        "type": 'line',
        "line-color": "#DC5623",
        'legend-text': 'Prize $',
        "animation": {
          "delay":10,
          "effect":5,
          "speed":"2000"
        },
        "valueBox": {
          "placement": 'top',
          "text": '$%v',
          "fontFamily": "Raleway",
          "font-size": 18,
          "color": '#3984C5',
          "shadow": true,
          "offset-y": -8
        }
      }
    ]
  }

  $scope.vm.ncaaPickEmData = {
    'type':'line',
    'title': {
      'text':"NCAA Pick'em Prize Pools",
      "fontFamily": "Raleway"
    },
    'plot':{
      'aspect': 'spline',
      'line-width': 5,
      'marker': {
        'background-color': '#337AB7',
        'size': 7,
        'border-color': '#DC5623',
        'border-width': 1
      }
    },
    'scaleX':{
      'values': [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
      'offset-y': 4,
    },
    'scaleY':{
      'format': '$%v'
    },
    'tooltip':{
      'text': '%kl: $%v'
    },
    'legend':{
      "layout":"1x1", //row x column
      "x":"10%",
      "y":"5%",
    },
    'series':[
      {
        "values": [550, 1170, 1050, 1080, 1080, 1090, 1150, 1550, 1650, 1970],
        "type": 'line',
        "line-color": "#DC5623",
        'legend-text': 'Prize $',
        "animation": {
          "delay":10,
          "effect":5,
          "speed":"2000"
        },
        "valueBox": {
          "placement": 'top',
          "text": '$%v',
          "fontFamily": "Raleway",
          "font-size": 18,
          "color": '#3984C5',
          "shadow": true,
          "offset-y": -8
        }
      }
    ]
  }

  $scope.vm.btbData = {
    'type':'line',
    'title': {
      'text':'NFL Battle the Bookies Prize Pools',
      "fontFamily": "Raleway"
    },
    'plot':{
      'aspect': 'spline',
      'line-width': 5,
      'marker': {
        'background-color': '#337AB7',
        'size': 7,
        'border-color': '#DC5623',
        'border-width': 1
      }
    },
    'scaleX':{
      'values': [2014, 2015, 2016, 2017],
      'offset-y': 4,
    },
    'scaleY':{
      'format': '$%v'
    },
    'tooltip':{
      'text': '%kl: $%v'
    },
    'legend':{
      "layout":"1x1", //row x column
      "x":"10%",
      "y":"5%",
    },
    'series':[
      {
        "values": [1620, 3600, 5100, 4890],
        "type": 'line',
        "line-color": "#DC5623",
        'legend-text': 'Prize $',
        "animation": {
          "delay":10,
          "effect":5,
          "speed":"2000"
        },
        "valueBox": {
          "placement": 'top',
          "text": '$%v',
          "fontFamily": "Raleway",
          "font-size": 18,
          "color": '#3984C5',
          "shadow": true,
          "offset-y": -8
        }
      }
    ]
  }

  $scope.vm.survivorData = {
    'type':'line',
    'title': {
      'text':'NFL Survivor Prize Pools',
      "fontFamily": "Raleway"
    },
    'plot':{
      'aspect': 'spline',
      'line-width': 5,
      'marker': {
        'background-color': '#337AB7',
        'size': 7,
        'border-color': '#DC5623',
        'border-width': 1
      }
    },
    'scaleX':{
      'values': [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      'offset-y': 4,
    },
    'scaleY':{
      'format': '$%v'
    },
    'tooltip':{
      'text': '%kl: $%v'
    },
    'legend':{
      "layout":"1x1", //row x column
      "x":"10%",
      "y":"5%",
    },
    'series':[
      {
        "values": [1155, 1870, 1870, 2750, 3905, 4180, 4620, 4950, 3880],
        "type": 'line',
        "line-color": "#DC5623",
        'legend-text': 'Prize $',
        "animation": {
          "delay":10,
          "effect":5,
          "speed":"2000"
        },
        "valueBox": {
          "placement": 'top',
          "text": '$%v',
          "fontFamily": "Raleway",
          "font-size": 18,
          "color": '#3984C5',
          "shadow": true,
          "offset-y": -8
        }
      }
    ]
  }

  $scope.vm.bowlPickEmData = {
    'type':'line',
    'title': {
      'text': "NCAA Bowl Pick'em Prize Pools",
      "fontFamily": "Raleway"
    },
    'plot':{
      'aspect': 'spline',
      'line-width': 5,
      'marker': {
        'background-color': '#337AB7',
        'size': 7,
        'border-color': '#DC5623',
        'border-width': 1
      }
    },
    'scaleX':{
      'values': [2009, 2010, 2012, 2013, 2014, 2015, 2016, 2017],
      'offset-y': 4,
    },
    'scaleY':{
      'format': '$%v'
    },
    'tooltip':{
      'text': '%kl: $%v'
    },
    'legend':{
      "layout":"1x1", //row x column
      "x":"10%",
      "y":"5%",
    },
    'series':[
      {
        "values": [100, 110, 165, 320, 600, 920, 800, 920],
        "type": 'line',
        "line-color": "#DC5623",
        'legend-text': 'Prize $',
        "animation": {
          "delay":10,
          "effect":5,
          "speed":"2000"
        },
        "valueBox": {
          "placement": 'top',
          "text": '$%v',
          "fontFamily": "Raleway",
          "font-size": 18,
          "color": '#3984C5',
          "shadow": true,
          "offset-y": -8
        }
      }
    ]
  }

}
