'use strict';

/**
 * @ngdoc directive
 * @name albatrossApp.directive:ngHideAuth
 * @description
 * # ngHideAuth
 */
angular.module('albatrossApp')
  .directive('ngHideAuth', function ($firebaseAuth, $timeout) {
    var auth = $firebaseAuth();

    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.addClass('ng-cloak');

        function update() {
          $timeout(function () {
            element.toggleClass('ng-cloak', !!auth.$getAuth());
          }, 0);
        }

        auth.$onAuthStateChanged(update);
        update();
      }
    };
  });
