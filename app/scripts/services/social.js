'use strict';

/**
 * @ngdoc service
 * @name albatrossApp.social
 * @description
 * # social
 * Factory in the albatrossApp.
 */
angular.module('albatrossApp')
  .factory('Social', function ($firebaseObject) {
    return function () {
      var ref = firebase.database().ref('social');
      return $firebaseObject(ref);
    };
  });
