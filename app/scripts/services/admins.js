'use strict';

/**
 * @ngdoc factory
 * @name albatrossApp.admins
 * @description
 * # admins
 * Factory in the albatrossApp.
 */
angular.module('albatrossApp')
  .factory('Admins', function ($firebaseArray) {
    return function () {
      var ref = firebase.database().ref('admins');
      return $firebaseArray(ref);
    };
  });
