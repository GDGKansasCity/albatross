'use strict';

/**
 * @ngdoc service
 * @name albatrossApp.cover
 * @description
 * # cover
 * Service in the albatrossApp.
 */
angular.module('albatrossApp')
  .factory('Cover', function ($firebaseObject) {
    return function () {
      var ref = firebase.database().ref('cover');
      return $firebaseObject(ref);
    };
  });
