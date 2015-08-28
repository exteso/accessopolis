(function() {
    "use strict";
    angular.module('accessopolis.search', [])
        .service('LocationSearchService', LocationSearchService)
        .directive('locationSearch', function() {
            return {
                restrict: 'C',
                scope: true,
                controller: LocationSearchController,
                controllerAs: 'ctrl',
                templateUrl: 'scripts/feature/search/location-search.html'
            }
        })
        .directive('location', ['$location', function($location) {
            return {
                restrict: 'A',
                scope: true,
                controller: function() {
                    var self = this;
                    this.showDetail = function() {
                        $location.path('/locations/'+self.location.id);
                    }
                },
                controllerAs: 'ctrl',
                bindToController: {
                    location: '='
                },
                templateUrl: 'scripts/feature/search/location.html'
            }
        }]);

    function LocationSearchService($q) {
        this.search = function(criterion) {
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
                resolve(_.chain(list)
                    .filter(function(e) {
                        if(angular.isDefined(criterion.type)) {
                            return e.type === criterion.type;
                        }
                        return true;
                    })
                    .filter(function(e) {
                        if(angular.isDefined(criterion.text)) {
                            return e.name.toLowerCase().indexOf(criterion.text.toLowerCase()) > -1;
                        }
                        return true;
                    }).value());
            });
        };
    }



    LocationSearchService.prototype.$inject = ['$q'];

    function LocationSearchController(LocationSearchService, $rootScope) {

        var self = this;

        $rootScope.$on('SubcategorySelected', function(event, subcategory) {
            LocationSearchService.search({type: subcategory}).then(function(result) {
                self.resultList = result;
            });
        });

        this.searchParam = undefined;

        this.performSearch = function() {
            LocationSearchService.search({text: self.searchParam}).then(function(result) {
                self.resultList = result;
            });
        };
    }

    LocationSearchController.prototype.$inject = ['LocationSearchService', '$rootScope'];
})();
