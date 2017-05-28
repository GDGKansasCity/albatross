'use strict';

/**
 * @ngdoc function
 * @name albatrossApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the albatrossApp
 */
angular.module('albatrossApp')
  .controller('EventsCtrl', function ($scope, $window, $location, $http, $filter, $mdDialog, Config, Social) {
    var vm = this;

    vm.future_loading = true;
    vm.past_loading = true;
    vm.events = { past: [], future: [] };

    vm.config = new Config();
    vm.config.$loaded().then(function (config) {
      vm.meetupKey = config.meetupKey;
    });

    vm.social = new Social();
    vm.social.$loaded().then(function (social) {
      var upcoming_url = 'https://api.meetup.com/' + social.meetup + '/events?key=' + vm.meetupKey +
        '&photo-host=secure&page=20&status=upcoming' +
        '&sig_id=12889940&sig=ece277cfc4be272311affb8a8ef00f812181d88a';
      var past_url = 'https://api.meetup.com/' + social.meetup + '/events?key=' + vm.meetupKey +
        '&photo-host=secure&page=20&desc=true&status=past' +
        '&sig_id=12889940&sig=ece277cfc4be272311affb8a8ef00f812181d88a';
      var jsonp_config = {
        'headers': { 'Accept': 'application/json;' },
        'timeout': 10000,
        'jsonpCallbackParam': 'callback'
      };

      // fetch upcoming meetups
      $http.jsonp(upcoming_url, jsonp_config).then(function (results) {
        var data = results.data.data;
        for (var i = data.length - 1; i >= 0; i--) {
          data[i].title = data[i].name;
          data[i].start = data[i].time;
          data[i].eventUrl = data[i].link;
          if (data[i].venue) {
            data[i].locationUrl = 'http://maps.google.com/?q=';
            if (data[i].venue.name) {
              data[i].locationUrl += data[i].venue.name.replace(new RegExp(' ', 'g'), '+').replace(new RegExp(',', 'g'), '') + '+';
            }
            if (data[i].venue.address_1) {
              data[i].locationUrl += data[i].venue.address_1.replace(new RegExp(' ', 'g'), '+').replace(new RegExp(',', 'g'), '') + '+';
            }
            if (data[i].venue.city) {
              data[i].locationUrl += data[i].venue.city.replace(new RegExp(' ', 'g'), '+').replace(new RegExp(',', 'g'), '') + '+';
            }
            if (data[i].venue.state) {
              data[i].locationUrl += data[i].venue.state.replace(new RegExp(' ', 'g'), '+').replace(new RegExp(',', 'g'), '') + '+';
            }
            if (data[i].venue.zip) {
              data[i].locationUrl += data[i].venue.zip.replace(new RegExp(' ', 'g'), '+').replace(new RegExp(',', 'g'), '');
            }
          }
          vm.events.future.push(data[i]);
        }
        vm.events.future = $filter('orderBy')(vm.events.future, 'start', false);
        vm.future_loading = false;
      }, function () {
        vm.upcomingError = 'Sorry, we failed to retrieve the upcoming events from the Meetup.com API.';
        vm.future_loading = false;
      });

      // fetch past meetups
      vm.getPastEvents = function () {
        $http.jsonp(past_url, jsonp_config).then(function (results) {
          var data = results.data.data;
          for (var i = data.length - 1; i >= 0; i--) {
            data[i].title = data[i].name;
            data[i].start = data[i].time;
            data[i].eventUrl = data[i].link;
            if (data[i].venue) {
              data[i].locationUrl = 'http://maps.google.com/?q=';
              if (data[i].venue.name) {
                data[i].locationUrl += data[i].venue.name.replace(new RegExp(' ', 'g'), '+').replace(new RegExp(',', 'g'), '') + '+';
              }
              if (data[i].venue.address_1) {
                data[i].locationUrl += data[i].venue.address_1.replace(new RegExp(' ', 'g'), '+').replace(new RegExp(',', 'g'), '') + '+';
              }
              if (data[i].venue.city) {
                data[i].locationUrl += data[i].venue.city.replace(new RegExp(' ', 'g'), '+').replace(new RegExp(',', 'g'), '') + '+';
              }
              if (data[i].venue.state) {
                data[i].locationUrl += data[i].venue.state.replace(new RegExp(' ', 'g'), '+').replace(new RegExp(',', 'g'), '') + '+';
              }
              if (data[i].venue.zip) {
                data[i].locationUrl += data[i].venue.zip.replace(new RegExp(' ', 'g'), '+').replace(new RegExp(',', 'g'), '');
              }
            }
            vm.events.past.push(data[i]);
          }
          vm.events.past = $filter('orderBy')(vm.events.past, 'start', true);
          vm.past_loading = false;
        }, function () {
          vm.pastError = 'Sorry, we failed to retrieve the past events from the Meetup.com API.';
          vm.past_loading = false;
        });
      };
      vm.getPastEvents();
    });

    function DialogController($scope, $mdDialog, event) {
      $scope.event = event;

      $scope.navigateTo = function (link) {
        $window.open(link, '_blank');
        return false;
      };

      $scope.closeDialog = function () {
        $mdDialog.hide();
      };
    }

    vm.viewEvent = function ($event, event) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'views/event.dialog.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose: true,
        resolve: {
          event: function () {
            return event;
          }
        }
      });
    };

    $scope.$on('$viewContentLoaded', function () {
      $window.ga('send', 'pageview', { page: $location.path() });
    });
  });
