'use strict';

/**
 * @ngdoc function
 * @name albatrossApp.controller:NewsCtrl
 * @description
 * # NewsCtrl
 * Controller of the albatrossApp
 */
angular.module('albatrossApp')
  .controller('NewsCtrl', function ($scope, $window, $location, $http, $timeout, $filter, $sce, Config) {
    var vm = this;

    vm.config = new Config();
    vm.loading = true;

    vm.config.$loaded().then(function (config) {
      var url = 'https://www.googleapis.com/plus/v1/people/' + config.googleID + '/activities/public?maxResults=4&key=' + config.googleKey;
      $http.jsonp(url, {jsonpCallbackParam: 'callback'}).then(function (results) {
        var entries = [], i,
            item, actor, object, content, html,
            published, actorImage, postImage, entry,
            data = results.data;

        for (i = 0; i < data.items.length; i++) {
          item = data.items[i];
          actor = item.actor || {};
          object = item.object || {};
          content = object.content;
          published = $filter('date')(new Date(item.published), 'fullDate');
          html = [];
          postImage = {};

          if (item.annotation) {
            content = item.annotation;
          }

          html.push(content.replace(new RegExp('\n', 'g'), '<br />').replace('<br><br>', '<br />'));
          html = html.join('');
          html = $sce.trustAsHtml(html);

          if (object.attachments && object.attachments.length) {
            switch (object.attachments[0].objectType) {
              case 'article':
              case 'photo':
                postImage =  {
                  url: (object.attachments[0].fullImage ? object.attachments[0].fullImage.url : null),
                  text: object.attachments[0].displayName
                };
                break;
              
              case 'video':
                postImage =  {
                  url: object.attachments[0].image.url,
                  text: object.attachments[0].displayName
                };
                break;
              
              case 'album':
                postImage =  {
                  url: object.attachments[0].thumbnails[0].image.url,
                  text: object.attachments[0].displayName
                };
                break;
            }
          }

          actorImage = actor.image.url;
          actorImage = actorImage.substr(0, actorImage.length - 2) + '16';

          entry = {
            via: {
              name: 'Google+',
              url: (object.attachments && object.attachments[0].objectType === 'event') ? object.attachments[0].url : item.url
            },
            published: published,
            body: html,
            date: item.updated,
            reshares: (object.resharers || {}).totalItems,
            plusones: (object.plusoners || {}).totalItems,
            comments: (object.replies || {}).totalItems,
            icon: actorImage,
            item: item,
            image: postImage,
            object: object
          };

          entries.push(entry);
        }
        vm.news = $filter('orderBy')(entries, 'date', true);
        $timeout(function () {
          gapi.plusone.go();
        });
        vm.loading = false;
      });
    });

    $scope.$on('$viewContentLoaded', function () {
      $window.ga('send', 'pageview', { page: $location.path() });
    });
  });
