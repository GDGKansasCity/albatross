'use strict';

/**
 * @ngdoc function
 * @name albatrossApp.controller:NewsCtrl
 * @description
 * # NewsCtrl
 * Controller of the albatrossApp
 */
angular.module('albatrossApp')
  .controller('NewsCtrl', function ($http, $timeout, $filter, $sce, Config) {
    var vm = this;

    vm.config = Config();
    vm.loading = true;

    vm.config.$loaded().then(function (config) {
      var url = 'https://www.googleapis.com/plus/v1/people/' + config.googleID +
        '/activities/public?callback=JSON_CALLBACK&maxResults=20&key=' + config.googleKey
      $http.jsonp(url).success(function (data) {
        var entries = [], i,
            item, actor, object, itemTitle, html,
            published, actorImage, entry;

        for (i = 0; i < data.items.length; i++) {
          item = data.items[i];
          actor = item.actor || {};
          object = item.object || {};
          itemTitle = object.content;
          published = $filter('date')(new Date(item.published), 'fullDate');
          html = [];

          html.push(itemTitle.replace(new RegExp('\n', 'g'), '<br />').replace('<br><br>', '<br />'));
          html = html.join('');
          html = $sce.trustAsHtml(html);

          actorImage = actor.image.url;
          actorImage = actorImage.substr(0, actorImage.length - 2) + '16';

          entry = {
            via: {
              name: 'Google+',
              url: item.url
            },
            published: published,
            body: html,
            date: item.updated,
            reshares: (object.resharers || {}).totalItems,
            plusones: (object.plusoners || {}).totalItems,
            comments: (object.replies || {}).totalItems,
            icon: actorImage,
            item: item,
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
  });
