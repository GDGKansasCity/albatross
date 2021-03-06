'use strict';

/**
 * @ngdoc function
 * @name albatrossApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the albatrossApp
 */
angular.module('albatrossApp')
  .controller('MainCtrl', function ($http, $location, User, Config, Social) {
    var vm = this,
        date = new Date();

    vm.config = new Config();
    vm.social = new Social();
    vm.loading = true;
    vm.copyright = '2012 - ' + date.getFullYear();
    
    vm.navigateTo = function (to) {
      $location.path(to);
      var content = document.getElementById('main-content');
      content.scrollTop = 0;
    };

    vm.logout = function () {
      User.logout();
    };

    vm.config.$loaded().then(function (config) {
      vm.chapter = config.chapterName;
      vm.website = config.chapterWebsite;
      vm.email = config.chapterEmail;
      vm.googlePlusLink = 'https://plus.google.com/' + config.googleID;
      vm.gdgLink = 'https://developers.google.com/groups/chapter/' + config.googleID + '/';
      vm.meetupKey = config.meetupKey;
    });

    vm.social.$loaded().then(function (social) {
      vm.social = social;
      vm.twitterLink = social.twitter ? 'https://twitter.com/' + social.twitter : null;
      vm.facebookLink = social.facebook ? 'https://www.facebook.com/' + social.facebook : null;
      vm.youtubeLink = social.youtube ? 'https://www.youtube.com/' + social.youtube : null;
      vm.meetupLink = social.meetup ? 'http://www.meetup.com/' + social.meetup : null;
      vm.githubLink = social.github ? 'https://github.com/' + social.github : null;
      vm.slackLink = social.slack ? social.slack : null;

      var meetupUrl = 'https://api.meetup.com/2/groups?key=' + vm.meetupKey + 
                    '&offset=0&format=json&group_urlname=' + social.meetup + 
                    '&photo-host=secure&page=20&radius=25.0&fields=sponsors&order=id&desc=false' +
                    '&sig_id=12889940&sig=ece277cfc4be272311affb8a8ef00f812181d88a';
      
      $http.jsonp(meetupUrl, {jsonpCallbackParam: 'callback'}).then(function (results) {
        vm.sponsors = results.data.results[0].sponsors;
        vm.loading = false;
      });
    });
  });
