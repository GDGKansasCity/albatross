'use strict';

/**
 * @ngdoc function
 * @name albatrossApp.controller:CoverCtrl
 * @description
 * # CoverCtrl
 * Controller of the albatrossApp
 */
angular.module('albatrossApp')
  .controller('CoverCtrl', function ($location, Cover) {
    var vm = this;

    vm.cover = Cover();
    vm.loading = true;

    vm.cover.$loaded().then(function () {
      vm.loading = false;
    });

    vm.showHero = function () {
      if (vm.cover.disabled) {
        return false;
      } else if ($location.path() !== '/') {
        return false;
      } else {
        return true;
      }
    };
  });
