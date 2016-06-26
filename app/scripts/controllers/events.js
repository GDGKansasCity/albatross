'use strict';

/**
 * @ngdoc function
 * @name albatrossApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the albatrossApp
 */
angular.module('albatrossApp')
  .controller('EventsCtrl', function ($http, $filter, $window, Config) {
    var vm = this;

    vm.config = Config();
    vm.events = { past: [], future: [] };
    vm.loading = true;

    vm.config.$loaded().then(function (config) {
      var url = 'https://hub.gdgx.io/api/v1/chapters/' + config.googleID + '/events/upcoming?callback=JSON_CALLBACK',
          headers = { 'headers': { 'Accept': 'application/json;' }, 'timeout': 10000 };
      $http.jsonp(url, headers).success(function (data) {
        for (var i = data.items.length - 1; i >= 0; i--) {
          if (data.items[i].about) {
            data.items[i].about = data.items[i].about.replace(new RegExp('<br />', 'g'), ''); // rip out extra breaks
          }
          if (data.items[i].location) {
            data.items[i].locationUrl = 'http://maps.google.com/?q=' + data.items[i].location.replace(new RegExp(' ', 'g'), '+').replace(new RegExp(',', 'g'), '');
          }
          vm.events.future.push(data.items[i]);
        }
        vm.events.future = $filter('orderBy')(vm.events.future, 'start', false);
        vm.loading = false;
      })
      .error(function (response) {
        vm.upcomingError = 'Sorry, we failed to retrieve the upcoming events from the GDG-X Hub API.';
        vm.loading = false;
      });

      var getPastEventsPage = function (page) {
        var url = 'https://hub.gdgx.io/api/v1/chapters/' + config.googleID + '/events/past?callback=JSON_CALLBACK&page=' + page,
        	  headers = { 'headers': {'Accept': 'application/json;'}, 'timeout': 10000 };
        $http.jsonp(url, headers).success(function (data) {
          for (var i = data.items.length - 1; i >= 0; i--) {
            if (data.items[i].about) {
              data.items[i].about = data.items[i].about.replace(new RegExp('<br />', 'g'), ''); // rip out extra breaks
            }
            if (data.items[i].location) {
              data.items[i].locationUrl = 'http://maps.google.com/?q=' + data.items[i].location.replace(new RegExp(' ', 'g'), '+').replace(new RegExp(',', 'g'), '');
            }
            vm.events.past.push(data.items[i]);
          }
          if (data.pages === page) {
            vm.events.past = $filter('orderBy')(vm.events.past, 'start', true);
            vm.loading = false;
          } else {
            getPastEventsPage(page + 1);
          }
        })
        .error(function (response) {
          vm.pastError = 'Sorry, we failed to retrieve the past events from the GDG-X Hub API.';
          vm.loading = false;
        });
      };
      getPastEventsPage(1);
    });

    vm.navigateTo = function (link) {
      $window.open(link, '_blank');
      return false;
    };
  });
