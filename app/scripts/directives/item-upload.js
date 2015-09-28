angular.module('accessopolisApp').directive('itemUpload', [function() {

      'use strict';

      return {
        restrict: 'E',
        scope: true,
        controllerAs: 'imageUploadCtrl',
        bindToController: {
          doUpload : '='
        },
        link: function(scope, element) {

          var inputElem = element.find('input')[0];
          inputElem.addEventListener('change', function() {
            var image = inputElem.files[0];
            if(image) {
              scope.imageUploadCtrl.doUpload(image);
            }
          }, false);
        },
        controller: function() {
        },
        template: '<input type="file" accept="image/*" capture="camera" ng-show-auth>'
      };
}]);
