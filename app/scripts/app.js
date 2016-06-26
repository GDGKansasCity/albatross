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
  .config(function ($routeProvider, $locationProvider, $mdThemingProvider) {
    // Firebase Config
    var config = {
      apiKey: "AIzaSyBRFFP_iZ3l82cD9ChchMlkz7fMMCa_XW8",   // Firebase API key
      authDomain: "gdg-kc.firebaseapp.com",                // Firebase Auth domain ("*.firebaseapp.com")
      databaseURL: "https://gdg-kc.firebaseio.com",        // Firebase Database URL ("https://*.firebaseio.com")
      storageBucket: "gdg-kc.appspot.com"                  // Firebase Storage bucket ("*.appspot.com")
    };
    firebase.initializeApp(config);

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
