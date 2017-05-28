'use strict';

/**
 * @ngdoc overview
 * @name albatrossApp
 * @description
 * # albatrossApp
 *
 * Main module of the application.
 */
angular
  .module('albatrossApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'firebase'
  ])
  .config(function () {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBRFFP_iZ3l82cD9ChchMlkz7fMMCa_XW8",
      authDomain: "gdg-kc.firebaseapp.com",
      databaseURL: "https://gdg-kc.firebaseio.com",
      projectId: "gdg-kc",
      storageBucket: "gdg-kc.appspot.com",
      messagingSenderId: "963693671257"
    };
    firebase.initializeApp(config);
  })
  .config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our asset domains
      'https://www.googleapis.com/plus/**',
      'https://api.meetup.com/**'
    ]);

    // The blacklist overrides the whitelist so the open redirect here is blocked.
    // $sceDelegateProvider.resourceUrlBlacklist([
    //   'https://example.com/**'
    // ]);
  })
  .config(function ($mdThemingProvider) {
    // MD Theme
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey', {
        'hue-1': '50',
        'hue-2': '100',
        'hue-3': '800'
      })
      .accentPalette('blue')
      .backgroundPalette('grey', {
        'hue-1': '50',
        'hue-2': '100',
        'hue-3': '800'
      });
  })
  .config(function ($routeProvider, $locationProvider) {
    // HTML5 Routes
    $locationProvider.html5Mode(true);

    // App Routes
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'admin'
      })
      .when('/events', {
        templateUrl: 'views/events.html',
        controller: 'EventsCtrl',
        controllerAs: 'vm'
      })
      .when('/organizers', {
        templateUrl: 'views/organizers.html',
        controller: 'OrganizersCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
