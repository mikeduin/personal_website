angular
  .module('mySite')
  .controller('AlaController', ['$scope', '$anchorScroll', '$location', 'alaService', 'authService', '$state', '$stateParams', AlaController])

function AlaController ($scope, $anchorScroll, $location, alaService, authService, $state, $stateParams) {
  $scope.$state = $state;
  $scope.vm = {};
  $scope.vm.sortOrder = '-date';
  $scope.vm.blogposts = [];
  $scope.vm.post = {};
  $scope.vm.newpost = {};
  $scope.vm.blogtags = [];
  $scope.contactForm = {};
  $scope.vm.contactSuccess = false;

  $scope.vm.checkStartTime = function(time) {
    if (moment().isBefore(time)) {
      return true;
    } else {
      return false;
    }
  };

  $scope.vm.register = function(user) {
    authService.register(user).error(function(error){
      vm.error = error.message;
    }).then(function(){
      $state.go('home.ala.blog');
    })
  };

  $scope.vm.logIn = function(user) {
    authService.logIn(user).error(function(error){
      vm.error = error.message;
      console.log(error)
    }).then(function(){
      $state.go('home.ala.blog');
    })
  };

  $scope.vm.isLoggedIn = function(){
    return authService.isLoggedIn();
  }

  $scope.vm.logOut = function(){
    authService.logOut();
  }

  $scope.vm.currentUser = function(){
    return authService.currentUser();
  }

  $scope.$on('$stateChangeSuccess', function(){
    document.body.scrollTop = document.documentElement.scrollTop=0;
  })

  // Pool Page Logic

  $scope.vm.retrievePools = function() {
    alaService.retrievePools().then(function(res){
      $scope.vm.pools = res;
    })
  }

  $scope.vm.getUser = function(){
    user = $scope.vm.currentUser();
    alaService.getUser(user).then(function(res){
      $scope.vm.userData = res[0];
    })
  };

  $scope.vm.getUser();

  $scope.register = function (pool, user) {
    var data = {
      pool: pool,
      user: user
    };

    $scope.activePool = pool;

    alaService.poolRegister(data).then(function(res){
      $state.go('home.ala.pools.poolConfirm');
    })
  };

  // Main Page Logic

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
  $scope.showNbaSurvivor = false;
  $scope.showConfidence = false;
  $scope.showPga = false;
  $scope.showNbaPlayoffs = false;
  $scope.showFifa = false;
  $scope.showCalcutta = false;

  $scope.vm.menuDisplay = function(click){
    var displays = ['showFantasyNBA', 'showMadness', 'showNcaaPickem', 'showBowlPickem', 'showBtb', 'showBaseball', 'showFootball', 'showSurvivor', 'showNbaSurvivor', 'showConfidence', 'showPga', 'showNbaPlayoffs', 'showFifa', 'showCalcutta'];

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
      blogposts.forEach(blogpost => {
        blogpost.tags = JSON.parse(blogpost.tags);
      })
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
      let p = post[0];
      if (p && p.tags) {
        p.tags = JSON.parse(p.tags);
      }
      $scope.vm.post = p;
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

  $scope.vm.champions17 = {};
  $scope.getChampions17 = function() {
    alaService.getChampions17().then(function(results){
      $scope.vm.champions17 = results;
    })
  };
  $scope.getChampions17();

  $scope.vm.champions18 = {};
  $scope.getChampions18 = function() {
    alaService.getChampions18().then(function(results){
      $scope.vm.champions18 = results;
    })
  };
  $scope.getChampions18();

  $scope.vm.champions19 = {};
  $scope.getChampions19 = function() {
    alaService.getChampions19().then(function(results){
      $scope.vm.champions19 = results;
    })
  };
  $scope.getChampions19();

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

  $scope.vm.calcuttaPodium = {};
  $scope.getCalcuttaPodium = function() {
    alaService.getCalcuttaPodium().then(function(results){
      $scope.vm.calcuttaPodium = results;
    })
  };
  $scope.getCalcuttaPodium();

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
      'values': [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
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
        "values": [660, 1134, 1510, 1680, 2110, 3540, 5423, 6511, 6675, 8787, 9792, 12200],
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
      'values': [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
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
        "values": [675, 810, 780, 930, 1120, 890, 1840, 2430, 1690, 1790, 1650, 1460],
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
      'values': [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
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
        "values": [550, 1170, 1050, 1080, 1080, 1090, 1150, 1550, 1650, 1970, 1760, 2224, 1110],
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

  $scope.vm.growthGraph = {
    'type':'area',
    'stacked': true,
    'title': {
      'text':'A Level Above Prize Pools, 2002 - 2019',
      "fontFamily": "Raleway",
      'offset-y': 20
    },
    'plot': {
        'alphaArea': 1,
        'aspect': 'spline',
        'contourOnTop': false,
        'lineWidth': '2px',
        'marker': {
          'visible': false
        },
        'tooltip':{
          text: "%kv Total: $%stack-total",
          backgroundColor: '#6A6A6A'
        },
        activeArea: true
      },
    'scaleX':{
      'values': [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      'guide': {
        'visible': false
      },
      'item': {
        'fontColor': '#5f5f5f'
      },
      'lineColor': '#5f5f5f',
        'lineWidth': '1px',
        'maxItems': 8,
        'tick': {
          'lineColor': '#5f5f5f',
          'lineWidth': '1px'
        },
        'zooming': true

      // 'offset-y': 4,
    },
    'scaleY':{
      'format': '$%v',
      'guide': {
          'lineColor': '#626262',
          'lineStyle': 'solid'
        },
        'item': {
          'fontColor': '#5f5f5f'
        },
        'lineColor': '#5f5f5f',
        'lineWidth': '1px',
        'tick': {
          'lineColor': '#5f5f5f',
          'lineWidth': '1px'
        }
    },
    'crosshairX': {
        'plotLabel': {
          'backgroundColor': '#434343',
          'fontColor': '#FFF',
          'paddingBottom': 10
        },
        'scaleLabel': {
          'backgroundColor': '#fff',
          'borderColor': '#333',
          'borderRadius': '3px',
          'borderWidth': '1px',
          'fontColor': 'black'
        }
      },
    'legend': {
        'align': 'left',
        // 'marginTop': '-60px',
        'backgroundColor': 'none',
        'borderWidth': '0px',
        'item': {
          'fontFamily': 'Raleway'
        },
        'layout': 'x4',
        'marker': {
          'type': 'circle',
          'borderColor': 'transparent',
          'size': '5px'
        },
        'shadow': false,
        'toggleAction': 'remove',
        'verticalAlign': 'top',
        "offset-y": 50,
        "offset-x": 50
      },
    'series':[
        // {
        //   text: "Calcutta Auctions",
        //   values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16040, 13566],
        //   backgroundColor1: '#3CBBB1',
        //   backgroundColor2: '#3CBBB1',
        //   lineColor: '#3CBBB1'
        // },
        {
          text: 'March Madness',
          values: [0, 0, 0, 0, 0, 0, 660, 1134, 1510, 1680, 2110, 3540, 5423, 6511, 6675, 8787, 9792, 12200],
          backgroundColor1: '#BEE9E8',
          backgroundColor2: '#BEE9E8',
          lineColor: '#BEE9E8'
        },
        {
          text: "NFL Battle the Bookies",
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1620, 3600, 5100, 4890, 5580, 6634],
          backgroundColor1: '#E7EFC5',
          backgroundColor2: '#E7EFC5',
          lineColor: '#E7EFC5'
        },
        {
          text: 'NFL Survivor',
          values: [0, 0, 0, 0, 0, 0, 1155, 1870, 1870, 2750, 3905, 4180, 4620, 4950, 3880, 3800, 4275, 3960],
          backgroundColor1: '#5FA8D3',
          backgroundColor2: '#5FA8D3',
          lineColor: '#5FA8D3'
        },
        {
          text: 'Fantasy NFL',
          values: [0, 0, 0, 0, 0, 0, 1707, 1782, 1980, 1980, 1980, 1980, 2035, 4715, 5394, 4900, 5920, 6314],
          backgroundColor1: '#CAE9FF',
          backgroundColor2: '#CAE9FF',
          lineColor: '#CAE9FF'
        },
        {
          text: 'Fantasy MLB',
          values: [200, 180, 240, 0, 0, 240, 693, 613, 645, 590, 590, 550, 1790, 1735, 1870, 1688, 1508, 1960],
          backgroundColor1: '#62B6CB',
          backgroundColor2: '#62B6CB',
          lineColor: '#62B6CB'
        },
        {
          text: 'Fantasy NBA',
          values: [0, 420, 530, 530, 510, 560, 660, 627, 660, 660, 660, 660, 2048, 2091, 1967, 2024, 2068, 1980],
          backgroundColor1: '#BFD7B5',
          backgroundColor2: '#BFD7B5',
          lineColor: '#BFD7B5'
        },
        {
          text: 'NFL Confidence',
          values: [0, 0, 0, 0, 0, 0, 0, 675, 810, 780, 930, 1120, 890, 1840, 2430, 1690, 1790, 1650],
          backgroundColor1: '#EC91D8',
          backgroundColor2: '#EC91D8',
          lineColor: '#EC91D8'
        },
        {
          text: "NCAA Pick'em",
          values: [0, 0, 0, 0, 0, 0, 550, 1170, 1050, 1080, 1080, 1090, 1150, 1550, 1650, 1970, 1760, 2224],
          backgroundColor1: '#FFAAEA',
          backgroundColor2: '#FFAAEA',
          lineColor: '#FFAAEA'
        },
        {
          text: "NCAA Bowl Pick'em",
          values: [0, 0, 0, 0, 0, 0, 0, 100, 110, 0, 165, 320, 600, 920, 800, 920, 1360, 1470],
          backgroundColor1: '#FFBEEF',
          backgroundColor2: '#FFBEEF',
          lineColor: '#FFBEEF'
        },
        {
          text: "NBA CDL",
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3470, 3470, 3470, 3470],
          backgroundColor1: '#9CADCE',
          backgroundColor2: '#9CADCE',
          lineColor: '#9CADCE'
        },
        {
          text: "NBA Survivor",
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3686],
          backgroundColor1: '#CEBACF',
          backgroundColor2: '#CEBACF',
          lineColor: '#CEBACF'
        },
        {
          text: "World Cup",
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3610, 0, 0, 0, 4960, 0],
          backgroundColor1: '#FFBEEF',
          backgroundColor2: '#FFBEEF',
          lineColor: '#FFBEEF'
        },
        {
          text: "NBA All-Star Spectacular",
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 280, 0, 0],
          backgroundColor1: '#5DD39E',
          backgroundColor2: '#5DD39E',
          lineColor: '#5DD39E'
        },
        {
          text: "NBA Playoffs",
          values: [0, 0, 0, 0, 0, 0, 243, 217, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor1: '#E9D3D0',
          backgroundColor2: '#E9D3D0',
          lineColor: '#E9D3D0'
        },
        {
          text: "PGA Majors",
          values: [0, 0, 0, 0, 0, 0, 189, 294, 240, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor1: '#BCE784',
          backgroundColor2: '#BCE784',
          lineColor: '#BCE784'
        }
      // {
      //   "values": [1620, 3600, 5100, 4890, 5580, 6634],
      //   "type": 'line',
      //   "line-color": "#DC5623",
      //   'legend-text': 'Prize $',
      //   "animation": {
      //     "delay":10,
      //     "effect":5,
      //     "speed":"2000"
      //   },
      //   "valueBox": {
      //     "placement": 'top',
      //     "text": '$%v',
      //     "fontFamily": "Raleway",
      //     "font-size": 18,
      //     "color": '#3984C5',
      //     "shadow": true,
      //     "offset-y": -8
      //   }
      // }
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
      'values': [2014, 2015, 2016, 2017, 2018, 2019],
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
        "values": [1620, 3600, 5100, 4890, 5580, 6634],
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

  $scope.vm.calcuttaData = {
    'type':'line',
    'title': {
      'text':'Calcutta Auction Prize Pools',
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
      'labels': ["'18 March Madness", "'18 Masters", "'18 NBA Playoffs", "'18 World Cup", "'18 NCAA Football", "'18 NFL", "'19 March Madness [SEL]", "'19 March Madness [PUB]", "'19 Masters", "'19 US Open", "'19 NFL"],
      'offset-y': 4,
      'max-items': 75,
      'item': {
        angle: 20
      },
      'tick': {
        size: '4px'
      },
      'min-value': 1000
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
        "values": [3243, 2735, 2228, 2958, 2867, 1930, 3840, 4323, 1753, 1557, 1877],
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

  $scope.vm.nbaSurvivorData = {
    'type':'line',
    'title': {
      'text':'NBA Survivor Prize Pools',
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
      'values': [2019],
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
        "values": [3686],
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
      'values': [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
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
        "values": [1155, 1870, 1870, 2750, 3905, 4180, 4620, 4950, 3880, 3800, 4275, 3960],
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
      'values': [2009, 2010, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
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
        "values": [100, 110, 165, 320, 600, 920, 800, 920, 1360, 1470],
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
