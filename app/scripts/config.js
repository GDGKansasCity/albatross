'use strict';

/**
 * @ngdoc factory
 * @name albatrossApp.config
 * @description
 * # config
 * Factory in the albatrossApp.
 */
angular.module('albatrossApp')
  .config(function () {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBRFFP_iZ3l82cD9ChchMlkz7fMMCa_XW8",
      authDomain: "gdg-kc.firebaseapp.com",
      databaseURL: "https://gdg-kc.firebaseio.com",
      projectId: "gdg-kc",
      storageBucket: "gdg-kc.appspot.com",
      messagingSenderId: "963693671257"
    };
    firebase.initializeApp(config);
  });
