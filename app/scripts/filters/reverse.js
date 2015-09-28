'use strict';

angular.module('accessopolisApp')
  .filter('reverse', function() {
    return function(items) {
      return angular.isArray(items)? items.slice().reverse() : [];
    };
  }).filter('imgurThumbnail', function() {
    return function(imageUrl, thumbnailType) {
      if(imageUrl) {
        var imgSeparatorIdx = imageUrl.lastIndexOf('.');
        if (imgSeparatorIdx !== -1) {
          imageUrl = imageUrl.substr(0, imgSeparatorIdx) + thumbnailType + imageUrl.substr(imgSeparatorIdx);
        }
      }
      return imageUrl;
    }
  });
