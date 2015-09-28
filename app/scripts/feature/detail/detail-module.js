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
        .directive('locationVideo', function() {
            return {
                restrict: 'A',
                scope: true,
                controllerAs: 'videoCtrl',
                controller: LocationVideoController,
                bindToController: {
                    locationVideo: '='
                },
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
        });

    function LocationDetailService($q, $firebaseObject, Ref, $firebaseArray) {
        this.find = function(id) {
            return $q(function(resolve, reject) {
                var obj = $firebaseObject(Ref.child('locations/'+id));
                obj.$loaded(function(val) {
                    resolve(val);
                });
            });
        };

        this.getComments = function(id) {
            return $q(function(resolve, reject) {
                var obj = $firebaseArray(Ref.child('comments/'+id));
                obj.$loaded(function(val) {
                    resolve(val);
                });
            });
        };

        this.getImages = function(id) {
            return $q(function(resolve, reject) {
              var obj = $firebaseArray(Ref.child('images/'+id));
              obj.$loaded(function(val) {
                resolve(val);
              });
            });
        };

        this.create = function(location) {
            var mock = {lat: 45.833376, long: 9.030515};
            return $firebaseArray(Ref.child('locations')).$add(angular.extend(mock, location));
        };

        this.rate = function(newRate){
            return $firebaseArray(Ref.child('ratings')).$add(newRate);
        };

        this.retrieveVideo = function(locationId) {
            return $q(function(resolve, reject) {
                $firebaseArray(Ref.child('videos').orderByChild('locationId').equalTo(locationId)).$loaded(function(list) {
                    resolve(_.first(list));
                });
            });
        };
    }

    LocationDetailService.prototype.$inject = ['$q', '$firebaseObject', 'Ref', '$firebaseArray', 'imgur', 'IMGUR_API_KEY'];

    function LocationDetailController(LocationDetailService, $routeParams, $location, user, imgur, IMGUR_API_KEY) {

        var self = this;
        self.user = user;

        imgur.setAPIKey(IMGUR_API_KEY);

        LocationDetailService.find($routeParams.id).then(function(result) {
            self.detail = result;
        });

        loadImages();

        LocationDetailService.getImages($routeParams.id).then(function(result) {
            self.images = result;
        });

        this.backToList = function() {
            $location.path('/');
        };

        this.rate = function(){
            var newRate = {locationId: $routeParams.id, userId: self.user.uid, rateKind: 'global', rate: self.vote, userType: 'public'};

            LocationDetailService.rate(newRate).then(function(result) {
                self.rateFeedback = result;
            });
        };

        this.addComment = function(newComment) {
            if( newComment ) {
                // push a message to the end of the array
                self.comments.$add({text: newComment})
                    // display any errors
                    .catch(alert);
            }
        };


        this.uploadImgur = function(file) {
          imgur.upload(file).then(function(model) {
              var httpsImageUrl = model.link.replace(/^http\:/, "https:");
              self.images.$add({imageUrl: httpsImageUrl}).catch(alert);
          });
        };

        function loadImages() {
          LocationDetailService.getComments($routeParams.id).then(function(result) {
              self.comments = result;
          });
        }

    }

    LocationDetailController.prototype.$inject = ['LocationDetailService', '$routeParams', '$location', 'user'];

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

    function LocationVideoController($scope, LocationDetailService, $sce) {
        var self = this;
        $scope.$watch(function() {
            return self.locationVideo;
        }, function(val) {
            if(angular.isDefined(val)) {
                LocationDetailService.retrieveVideo(val.$id).then(function(result) {
                    var url = angular.isDefined(result) ? result.url : undefined;
                    if(angular.isDefined(url)) {
                        self.url = $sce.trustAsResourceUrl(url);
                    }
                });
            }
        });
    }

    LocationVideoController.prototype.$inject = ['$scope', 'LocationDetailService', '$sce'];

})();
