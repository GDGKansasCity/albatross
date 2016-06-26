'use strict';

/**
 * @ngdoc function
 * @name albatrossApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the albatrossApp
 */
angular.module('albatrossApp')
  .controller('AboutCtrl', function ($http, $sce, Config) {
    var vm = this;

    vm.loading = true;
    vm.config = Config();

    vm.config.$loaded().then(function (config) {
      var url = 'https://www.googleapis.com/plus/v1/people/' + config.googleID + '?callback=JSON_CALLBACK&key=' + config.googleKey;
      $http.jsonp(url + '&fields=aboutMe')
      .success(function(data) {
        vm.desc = data.aboutMe;
        $sce.trustAsHtml(vm.desc);
        vm.loading = false;
      })
      .error(function() {
        vm.desc = 'Sorry, we failed to retrieve the About text from the Google+ API.';
        vm.loading = false;
      });
    });
  });
