'use strict';

/**
 * @ngdoc function
 * @name albatrossApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the albatrossApp
 */
angular.module('albatrossApp')
  .controller('AboutCtrl', function ($scope, $window, $location, $http, $sce, Config, Social) {
    var vm = this;

    vm.loading = true;
    vm.copy_year = new Date().getFullYear();
    vm.config = new Config();
    vm.config.$loaded().then(function (config) {
      vm.meetupKey = config.meetupKey;
    });

    vm.social = new Social();
    vm.social.$loaded().then(function (social) {
      var meetup_url = 'https://api.meetup.com/' + social.meetup + '?key=' + vm.meetupKey +
        '&photo-host=secure' +
        '&sig_id=12889940&sig=ece277cfc4be272311affb8a8ef00f812181d88a';
      var jsonp_config = {
        'headers': { 'Accept': 'application/json;' },
        'timeout': 10000,
        'jsonpCallbackParam': 'callback'
      };

      // fetch meetup details
      $http.jsonp(meetup_url, jsonp_config).then(function (results) {
        var data = results.data.data;
        vm.desc = data.description;
        $sce.trustAsHtml(vm.desc);
        vm.loading = false;
      }, function () {
        vm.upcomingError = 'Sorry, we failed to retrieve the Description from the Meetup.com API.';
        vm.loading = false;
      });
    });

    $scope.$on('$viewContentLoaded', function () {
      $window.ga('send', 'pageview', { page: $location.path() });
    });
  });
