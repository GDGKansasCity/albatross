'use strict';

/**
 * @ngdoc factory
 * @name albatrossApp.config
 * @description
 * # config
 * Factory in the albatrossApp.
 */
angular.module('albatrossApp')
  .factory('Config', function ($firebaseObject) {
    return function () {
      var ref = firebase.database().ref('config');
      return $firebaseObject(ref);
    };
  });