angular.module('accessopolisApp').directive('imageUpload', ['imgur', 'IMGUR_API_KEY', function(imgur, IMGUR_API_KEY) {

      'use strict';

      return {
        restrict: 'E',
        scope: true,
        controllerAs: 'imageUploadCtrl',
        link: function(element) {

        },
        controller: function() {

        },
        template: '<input type="file" accept="image/*" capture="camera">'
      };
}]);
