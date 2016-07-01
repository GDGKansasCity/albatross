'use strict';

/**
 * @ngdoc function
 * @name albatrossApp.controller:CoverCtrl
 * @description
 * # CoverCtrl
 * Controller of the albatrossApp
 */
angular.module('albatrossApp')
  .controller('CoverCtrl', function (Cover) {
    var vm = this;

    vm.cover = Cover();
    vm.loading = true;

    vm.cover.$loaded().then(function (cover) {
      vm.loading = false;
    });
  });
