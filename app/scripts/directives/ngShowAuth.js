'use strict';

/**
 * @ngdoc directive
 * @name albatrossApp.directive:ngShowAuth
 * @description
 * # ngShowAuth
 */
angular.module('albatrossApp')
  .directive('ngShowAuth', function ($firebaseAuth, $timeout) {
    var auth = $firebaseAuth();

    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.addClass('ng-cloak');

        function update() {
          $timeout(function () {
            element.toggleClass('ng-cloak', !auth.$getAuth());
          }, 0);
        }

        auth.$onAuthStateChanged(update);
        update();
      }
    };
  });
