(function() {
    "use strict";
    angular.module('accessopolis.search', ['accessopolis.rating'])
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
                        $location.path('/locations/'+self.location.$id);
                    }
                },
                controllerAs: 'ctrlLoc',
                bindToController: {
                    location: '='
                },
                templateUrl: 'scripts/feature/search/location.html'
            }
        }]);

    function LocationSearchService($q, Ref, $firebaseArray) {
        this.search = function(criterion) {
            return $q(function(resolve, reject) {
                var list = $firebaseArray(Ref.child('locations'));
                list.$loaded(function(data) {
                    var filteredResults = _.chain(data)
                        .filter(function(e) {
                            if(angular.isDefined(criterion.type)) {
                                return e.type === criterion.type;
                            }
                            return true;
                        })
                        .filter(function(e) {
                            if(angular.isDefined(criterion.text)) {
                                var split = criterion.text.split(/[\s,]/);
                                var minimumScore = Math.max(1, split.length -1);
                                return _.filter(split, function(w) {
                                        return e.text.toLowerCase().indexOf(w.toLowerCase()) > -1;
                                    }).length >= minimumScore;
                            }
                            return true;
                        }).value();
                    resolve(filteredResults);
                }, reject);
            });
        };
    }



    LocationSearchService.prototype.$inject = ['$q', 'Ref', '$firebaseArray'];

    function LocationSearchController(LocationSearchService, $rootScope) {

        var self = this;

        $rootScope.$on('SubcategorySelected', function(event, subcategory) {
            LocationSearchService.search({type: subcategory}).then(function(result) {
                self.resultList = result;
            });
            self.subcategorySelected = subcategory;
        });

        this.searchParam = undefined;

        this.clearSubcategory = function($event) {
            self.subcategorySelected = undefined;
            $event.stopPropagation();
        };

        this.performSearch = function() {
            LocationSearchService.search({text: self.searchParam}).then(function(result) {
                self.resultList = result;
            });
        };
    }

    LocationSearchController.prototype.$inject = ['LocationSearchService', '$rootScope'];
})();
