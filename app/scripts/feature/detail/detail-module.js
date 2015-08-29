(function() {
    "use strict";
    angular.module('accessopolis.locationDetail', [])
        .service('LocationDetailService', LocationDetailService)
        .controller('LocationDetailController', LocationDetailController)
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/locations/:id', {
                    templateUrl: 'scripts/feature/detail/detail.html',
                    controller: 'LocationDetailController',
                    controllerAs: 'ctrl'
                });
        }]);

    function LocationDetailService($q, $firebaseObject, Ref) {
        this.find = function(id) {
            return $q(function(resolve, reject) {
                var obj = $firebaseObject(Ref.child('locations').orderByKey().equalTo(id));
                obj.$loaded(function(val) {
                    resolve(val[id]);
                });
            });
        };
    }



    LocationDetailService.prototype.$inject = ['$q', '$firebaseObject', 'Ref'];

    function LocationDetailController(LocationDetailService, $routeParams, $location) {

        var self = this;
        LocationDetailService.find($routeParams.id).then(function(result) {
            self.detail = result;
        });

        this.backToList = function() {
            $location.path('/');
        };
    }

    LocationDetailController.prototype.$inject = ['LocationSearchService', '$routeParams', '$location'];
})();
