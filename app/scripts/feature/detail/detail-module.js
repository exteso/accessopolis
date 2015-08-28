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

    function LocationDetailService($q) {
        this.find = function(id) {
            return $q(function(resolve, reject) {
                var list = [{
                    id: 0,
                    name: 'Ristorante Indipendenza',
                    address: 'Piazza Indipendenza, Chiasso',
                    type: 'bar'
                }, {
                    id: 1,
                    name: 'Hotel Ristorante Mövenpick',
                    address: 'Piazza Indipendenza, Chiasso',
                    type: 'hotels'
                }, {
                    id: 2,
                    name: 'Ufficio Postale Chiasso',
                    address: 'Piazza Indipendenza, Chiasso',
                    type: 'pub'
                }];
                resolve(_.find(list, function(e) {return e.id === parseInt(id)}));
            });
        };
    }



    LocationDetailService.prototype.$inject = ['$q'];

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
