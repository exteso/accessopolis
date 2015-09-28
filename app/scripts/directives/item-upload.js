angular.module('accessopolisApp').directive('itemUpload', ['$timeout', function($timeout) {

      'use strict';

      return {
        restrict: 'E',
        scope: true,
        controllerAs: 'imageUploadCtrl',
        bindToController: {
            doUpload : '=',
            accept : '@'
        },
        link: function(scope, element) {

          var inputElem = element.find('input')[0];
          inputElem.addEventListener('change', function() {
            var image = inputElem.files[0];
            if(image) {
              $timeout(function() {
                scope.imageUploadCtrl.doUpload(image);
              });
            }
          }, false);
        },
        controller: function() {
        },
        template: '<input type="file" accept="imageUploadCtrl.accept" capture="camera" ng-show-auth>'
      };
}]);
