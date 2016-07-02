'use strict';

/**
 * @ngdoc function
 * @name albatrossApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the albatrossApp
 */
angular.module('albatrossApp')
  .controller('AdminCtrl', function ($scope, $timeout, $mdDialog, $mdToast, User, Cover, Social, Config, Admins) {
    var vm = this,
        storage = firebase.storage();

    vm.cover = Cover();
    vm.social = Social();
    vm.config = Config();
    vm.admins = Admins();
    vm.imageLoading = false;

    vm.login = function () {
      User.signIn();
    };

    vm.saveCover = function () {
      if (vm.cover.clearImage) {
        delete vm.cover.image;
        delete vm.cover.clearImage;
      }

      vm.cover.$save().then(function () {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Cover Banner Saved')
            .position('bottom left')
            .hideDelay(3000)
        );
      });
    };

    vm.handleImageAdd = function () {
      vm.imageLoading = true;
      $timeout(function () {
        var file = vm.cover.coverImage.file,
            compressed = vm.cover.coverImage.compressed;

        // Get a reference to the location where we'll store our photos
        var storageRef = storage.ref().child('cover_photos');
        
        // Get a reference to store file at photos/<FILENAME>.jpg
        var photoRef = storageRef.child(file.name);
        // Upload file to Firebase Storage
        var uploadTask = photoRef.put(dataURItoBlob(compressed.dataURL));
        uploadTask.on('state_changed', null, null, function() {
          // When the image has successfully uploaded, we get its download URL
          var downloadUrl = uploadTask.snapshot.downloadURL;
          // Set the download URL to the message box, so that the user can send it to the database
          vm.cover.image = downloadUrl;
          delete vm.cover.coverImage;
          vm.imageLoading = false;
        });
      }, 2000);
    };

    var dataURItoBlob = function (dataURI) {
      var byteString, mimeString;

      if (dataURI.split(',')[0].indexOf('base64') !== -1) {
        byteString = atob(dataURI.split(',')[1]);
      } else {
        byteString = decodeURI(dataURI.split(',')[1]);
      }

      mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      var content = new Array();
      for (var i = 0; i < byteString.length; i++) {
        content[i] = byteString.charCodeAt(i);
      }

      return new Blob([new Uint8Array(content)], {type: mimeString});
    };


    vm.cover.$loaded().then(function (cover) {
      $scope.$watch('vm.cover.coverImage', function() {
        document.getElementById('coverImage').addEventListener('change', vm.handleImageAdd, false);
      }, true);
    });

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
