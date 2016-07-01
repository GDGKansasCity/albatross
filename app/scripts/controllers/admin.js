'use strict';

/**
 * @ngdoc function
 * @name albatrossApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the albatrossApp
 */
angular.module('albatrossApp')
  .controller('AdminCtrl', function ($mdDialog, $mdToast, User, Cover, Social, Config, Admins) {
    var vm = this;

    vm.cover = Cover();
    vm.social = Social();
    vm.config = Config();
    vm.admins = Admins();

    vm.login = function () {
      User.signIn();
    };

    vm.saveCover = function () {
      vm.cover.$save().then(function () {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Cover Banner Saved')
            .position('bottom left')
            .hideDelay(3000)
        );
      });
    };

    vm.saveSocial = function () {
      vm.social.$save().then(function () {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Social Saved')
            .position('bottom left')
            .hideDelay(3000)
        );
      });
    };

    vm.saveConfig = function () {
      vm.config.$save().then(function () {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Config Saved')
            .position('bottom left')
            .hideDelay(3000)
        );
      });
    };

    vm.addAdmin = function (ev) {
      var confirm = $mdDialog.prompt()
        .title('Add Admin Email')
        .placeholder('Admin Email')
        .ariaLabel('Admin Email')
        .targetEvent(ev)
        .ok('Save')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function (result) {
        vm.admins.$add(result);
        $mdToast.show(
          $mdToast.simple()
            .textContent('Admin Saved')
            .position('bottom left')
            .hideDelay(3000)
        );
      });
    };

    vm.removeAdmin = function (ev, admin) {
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to delete this admin?')
        .textContent('This cannot be undone!')
        .ariaLabel('Delete Admin')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
        vm.admins.$remove(admin);
        $mdToast.show(
          $mdToast.simple()
            .textContent('Admin Removed')
            .position('bottom left')
            .hideDelay(3000)
        );
      });
    };
  });
