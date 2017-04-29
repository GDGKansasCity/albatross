'use strict';

/**
 * @ngdoc function
 * @name albatrossApp.controller:OrganizersCtrl
 * @description
 * # OrganizersCtrl
 * Controller of the albatrossApp
 */
angular.module('albatrossApp')
  .controller('OrganizersCtrl', function ($scope, $window, $location, $http, $timeout, Config) {
    var vm = this;

    vm.config = Config();
    vm.loading = true;

    vm.config.$loaded().then(function (config) {
      var url = 'https://www.googleapis.com/plus/v1/people/' + config.googleID + '?key=' + config.googleKey;
      $http.jsonp(url + '&fields=urls', {jsonpCallbackParam: 'callback'}).then(function (results) {
          var data = results.data, orgs = [], i = 0;
          for (i = 0; i < data.urls.length; i++) {
            var url = data.urls[i];
            if (url.label.substring(0, 9) === 'Organizer') {
              var org = {
                link: url.value
              };
              orgs.push(org);
            }
          }
          vm.organizers = orgs;
          vm.loading = false;
          $timeout(function () {
            gapi.person.go();
          });
        }, function () {
          vm.error = 'Sorry, we failed to retrieve the Organizers from the Google+ API.';
          vm.loading = false;
        });
    });

    $scope.$on('$viewContentLoaded', function () {
      $window.ga('send', 'pageview', { page: $location.path() });
    });
  });