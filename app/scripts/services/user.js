'use strict';

/**
 * @ngdoc service
 * @name albatrossApp.user
 * @description
 * # user
 * Service in the albatrossApp.
 */
angular.module('albatrossApp')
  .service('User', function ($location, $firebaseAuth, Admins, SITE_SETUP) {
    var self = this,
        auth = $firebaseAuth(),
        admins = new Admins();

    self.signIn = function () {
      auth.$signInWithPopup("google").then(function (fbUser) {
        var allowedUser = false;
        admins.$loaded().then(function (list) {
          for (var i = 0; i < list.length; i++) {
            if (list[i].$value === fbUser.user.email) {
              allowedUser = true;
            }
          }
          if (!allowedUser && !SITE_SETUP) {
            console.log('Auth failed, user not allowed.');
            self.logout();
          }
        });
      });
    };

    self.logout = function () {
      auth.$signOut();
      $location.path('/');
    };
  });
