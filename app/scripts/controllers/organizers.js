'use strict';

/**
 * @ngdoc function
 * @name albatrossApp.controller:OrganizersCtrl
 * @description
 * # OrganizersCtrl
 * Controller of the albatrossApp
 */
angular.module('albatrossApp')
  .controller('OrganizersCtrl', function ($scope, $window, $location, $http, $timeout, Config, Social) {
    var vm = this;

    vm.loading = true;
    vm.organizers = [];
    vm.config = new Config();
    vm.config.$loaded().then(function (config) {
      vm.meetupKey = config.meetupKey;
    });

    vm.social = new Social();
    vm.social.$loaded().then(function (social) {
      var meetup_url = 'https://api.meetup.com/' + social.meetup + '/members?key=' + vm.meetupKey +
        '&photo-host=secure&role=leads' +
        '&sig_id=12889940&sig=ece277cfc4be272311affb8a8ef00f812181d88a';
      var jsonp_config = {
        'headers': { 'Accept': 'application/json;' },
        'timeout': 10000,
        'jsonpCallbackParam': 'callback'
      };

      // fetch meetup details
      $http.jsonp(meetup_url, jsonp_config).then(function (results) {
        vm.organizers = results.data.data;
        vm.loading = false;
      }, function () {
        vm.upcomingError = 'Sorry, we failed to retrieve the Organizers from the Meetup.com API.';
        vm.loading = false;
      });
    });

    $scope.$on('$viewContentLoaded', function () {
      $window.ga('send', 'pageview', { page: $location.path() });
    });
  });
