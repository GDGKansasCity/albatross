'use strict';

/**
 * @ngdoc service
 * @name albatrossApp.user
 * @description
 * # user
 * Service in the albatrossApp.
 */
angular.module('albatrossApp')
  .service('User', function ($location, $firebaseAuth, Admins) {
    var self = this,
        auth = $firebaseAuth(),
        admins = Admins();

    self.signIn = function (ev) {
      auth.$signInWithPopup("google").then(function (fbUser) {
        var allowedUser = false;
        admins.$loaded().then(function (list) {
          for (var i = 0; i < list.length; i++) {
            if (list[i].$value === fbUser.user.email) {
              allowedUser = true;
            }
          }
          if (!allowedUser) {
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
