angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'ionic.service.core',
  'starter.controllers',
  'starter.services',
  'underscore'
])

.run(function($ionicPlatform, $rootScope, $state, AuthService) {
  $ionicPlatform.ready(function() {
    AuthService.userIsLoggedIn().then(function(response)
    {
      if(response === true)
      {
        $state.go('app.user');
      }
      else
      {
        $state.go('auth.login');
      }
    });

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      if (cordova.plugins.Keyboard.hideKeyboardAccessoryBar) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  // UI Router Authentication Check
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.data.authenticate)
    {
      AuthService.userIsLoggedIn().then(function(response)
      {
        if(response === false)
        {
          event.preventDefault();
          $state.go('auth.login');
        }
      });
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('auth', {
    url: '/auth',
    abstract: true,
    templateUrl: 'templates/auth/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('auth.login', {
    url: '/login',
    views: {
      'tab-login': {
        templateUrl: 'templates/auth/login.html',
        controller: 'LogInCtrl'
      }
    },
    data: {
      authenticate: false
    }
  })

  .state('auth.signup', {
    url: '/signup',
    views: {
      'tab-signup': {
        templateUrl: 'templates/auth/signup.html',
        controller: 'SignUpCtrl'
      }
    },
    data: {
      authenticate: false
    }
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/app/tabs.html'
  })

  .state('app.user', {
    url: '/user',
    views: {
      'tab-user': {
        templateUrl: 'templates/app/user.html',
        controller: 'UserCtrl'
      }
    },
    data: {
      authenticate: true
    }
  })

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/user');
});
