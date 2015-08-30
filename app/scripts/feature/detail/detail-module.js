(function() {
    "use strict";
    angular.module('accessopolis.locationDetail', ['accessopolis.navigation'])
        .service('LocationDetailService', LocationDetailService)
        .controller('LocationDetailController', LocationDetailController)
        .controller('NewLocationController', NewLocationController)
        .directive('autocompleteAddress', [function() {
            return {
                restrict: 'A',
                scope: true,
                controller: ['$rootScope', '$scope', '$log', function($rootScope, $scope, $log) {
                    var self = this;
                    $scope.$watch(function() {
                        return self.autocomplete;
                    }, function(val) {
                        if(val) {
                            val.addListener('place_changed', function() {
                                var place = self.autocomplete.getPlace();
                                if (place.geometry) {
                                    $rootScope.$broadcast('LocationSelected', place.geometry.location);
                                }
                            });
                        }
                    })


                }],
                bindToController: true,
                controllerAs: 'autocompleteCtrl',
                link: function(scope, element, attrs) {
                    scope.$watch(function() {
                        return accessopolis.googleMapReady;
                    }, function(val) {
                        if(val) {
                            scope.autocompleteCtrl.autocomplete = new google.maps.places.Autocomplete(element[0], {types: ['geocode']});
                        }
                    });
                }
            }

        }])
        .directive('videoReview', function() {
            return {
                restrict: 'A',
                scope: true,
                controller: function() {},
                bindToController: true,
                controllerAs: 'videoController',
                templateUrl: 'scripts/feature/detail/video.html'
            }
        })
        .directive('imageMap', function() {
            return {
                restrict: 'A',
                scope: true,
                controllerAs: 'imageCtrl',
                controller: function() {
                    var self = this;
                    this.showImage = function() {
                        return angular.isDefined(self.location) && angular.isDefined(self.location.lat) && angular.isDefined(self.location.long);
                    }
                },
                bindToController: {
                    location: '=imageMap'
                },
                template: '<a href="https://google.com/maps?z=12&t=m&q=loc:{{imageCtrl.location.lat}}+{{imageCtrl.location.long}}" title="google maps" data-ng-if="imageCtrl.showImage()" target="_blank">' +
                '<div class="accessopolis-location-map hidden-xs" style="background-image: url(\'https://maps.googleapis.com/maps/api/staticmap?center={{imageCtrl.location.lat}},{{imageCtrl.location.long}}&zoom=15&size=392x300&maptype=roadmap&markers=color:red%7Clabel:C%7C{{imageCtrl.location.lat}},{{imageCtrl.location.long}}\'); background-size: cover" ></div>' +
                '<div class="accessopolis-location-map visible-xs" style="background-image: url(\'https://maps.googleapis.com/maps/api/staticmap?center={{imageCtrl.location.lat}},{{imageCtrl.location.long}}&zoom=15&size=786x300&maptype=roadmap&markers=color:red%7Clabel:C%7C{{imageCtrl.location.lat}},{{imageCtrl.location.long}}\'); background-size: cover"></div>' +
                '</a>'
            }
        })
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/locations/:id', {
                templateUrl: 'scripts/feature/detail/detail.html',
                controller: 'LocationDetailController',
                controllerAs: 'ctrl'
            }).when('/new-location', {
                templateUrl: 'scripts/feature/detail/new.html',
                controller: 'NewLocationController',
                controllerAs: 'ctrl'
            });
        }]);

    function LocationDetailService($q, $firebaseObject, Ref, $firebaseArray) {
        this.find = function(id) {
            return $q(function(resolve, reject) {
                var obj = $firebaseObject(Ref.child('locations/'+id));
                obj.$loaded(function(val) {
                    resolve(val);
                });
            });
        };

        this.create = function(location) {
            var mock = {lat: 45.833376, long: 9.030515};
            return $firebaseArray(Ref.child('locations')).$add(angular.extend(mock, location));
        }
    }

    LocationDetailService.prototype.$inject = ['$q', '$firebaseObject', 'Ref', '$firebaseArray'];

    function LocationDetailController(LocationDetailService, $routeParams, $location) {

        var self = this;
        LocationDetailService.find($routeParams.id).then(function(result) {
            self.detail = result;
        });

        this.backToList = function() {
            $location.path('/');
        };
    }

    LocationDetailController.prototype.$inject = ['LocationDetailService', '$routeParams', '$location'];

    function NewLocationController(NavigationService, LocationDetailService, $location, $rootScope) {
        var self = this;
        this.location = {};
        //this.stars = _.range(0,6);

        this.save = function(frm) {
            if(!frm.$valid) {
                return;
            }
            LocationDetailService.create(self.location).then(function(data) {
                $location.path('/locations/'+data.name());
            }, function(err) {
                alert(err);
            });
        };

        this.backToList = function() {
            $location.path('/');
        };

        NavigationService.loadNavigationElements().then(function(result) {
            result.$loaded(function(data) {
                self.subtypes = _.chain(data).map('subcategory').flatten().uniq().value();
            });
        });

        $rootScope.$on('LocationSelected', function(e, data) {
            self.location.lat = data.G;
            self.location.long = data.K;
        });

    }

    NewLocationController.prototype.$inject = ['NavigationService', 'LocationDetailService', '$location', '$rootScope'];

})();
