var app = angular.module('starter', [
  'ionic',
  'start.controller',
  'today.controller',
  'note.controller',
  'static.controller',
  'movietips.controller',
  'movie.controller',
  'single.controller',
  'pickadate'
 ]);


app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: "js/states/today/today-template.html",
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: "js/states/statics/static-template.html",
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:date',
      views: {
        'tab-chats': {
          templateUrl: "js/states/statics/single-template.html",
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: "js/states/movietips/movietip-template.html",
        
      }
    }
  })

  .state('tab.movie-detail', {
      url:"/account/:value",
      views: {
        'tab-chats': {
          templateUrl: "js/states/movietips/movie-template.html",
        }
      }
    })

  .state('tab.start', {
    url: '/start',
    views: {
      'tab-start': {
        templateUrl: "js/states/start/start-template.html",
        
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/start');

});
