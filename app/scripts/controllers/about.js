'use strict';

/**
 * @ngdoc function
 * @name albatrossApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the albatrossApp
 */
angular.module('albatrossApp')
  .controller('AboutCtrl', function ($scope, $window, $location, $http, $sce, Config) {
    var vm = this;

    vm.loading = true;
    vm.copy_year = new Date().getFullYear();
    vm.config = new Config();

    vm.config.$loaded().then(function (config) {
      var url = 'https://www.googleapis.com/plus/v1/people/' + config.googleID + '?key=' + config.googleKey;
      $http.jsonp(url + '&fields=aboutMe', {jsonpCallbackParam: 'callback'}).then(function (results) {
        var data = results.data;
        vm.desc = data.aboutMe;
        $sce.trustAsHtml(vm.desc);
        vm.loading = false;
      }, function () {
        vm.desc = 'Sorry, we failed to retrieve the About text from the Google+ API.';
        vm.loading = false;
      });
    });

    $scope.$on('$viewContentLoaded', function () {
      $window.ga('send', 'pageview', { page: $location.path() });
    });
  });
