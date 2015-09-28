(function() {
    "use strict";
    angular.module('accessopolis.locationDetail', ['accessopolis.navigation'])
        .service('LocationDetailService', LocationDetailService)
        .service('LocationVideoService', LocationVideoService)
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
                                    $rootScope.$broadcast('LocationSelected', place);
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

        this.update = function(location){
            if (location.$id){
                var obj = $firebaseObject(Ref.child('locations/'+location.$id));

                obj.$loaded().then(function() {
                    angular.extend(obj, location);
                    return obj.$save();
                });
                return obj;
            }
        };

        this.create = function(location) {
            return $firebaseArray(Ref.child('locations')).$add(location);
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

    function LocationDetailController(LocationDetailService, $routeParams, $location, user, imgur, IMGUR_API_KEY, LocationVideoService) {

        var self = this;
        self.user = user;

        imgur.setAPIKey(IMGUR_API_KEY);

        this.imagesType = ['entrance', 'bathroom', 'elevator', 'stairs', 'stairlift', 'room', 'lunchroom', 'other'];

        LocationDetailService.find($routeParams.id).then(function(result) {
            self.detail = result;
            LocationVideoService.loadVideos(result).$loaded(function(list) {
                self.videos = list;
            });
        });

        loadImages();

        LocationDetailService.getImages($routeParams.id).then(function(result) {
            self.images = result;
        });

        this.backToList = function() {
            $location.path('/');
        };

        this.edit = function() {
            var path = $location.path();
            $location.path(path+'/edit');
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
          self.imageUpload = self.imageUpload || {};
          self.imageUpload.file = file;
        };

        this.addImage = function() {
          var file = self.imageUpload.file;
          var imageType = self.imageUpload.imageType;
          var description = self.imageUpload.description;
          self.imageUpload = {};
          imgur.upload(file).then(function(model) {
              var httpsImageUrl = model.link.replace(/^http\:/, "https:");
              self.images.$add({imageUrl: httpsImageUrl, imageType: imageType, description: description}).catch(alert);
          });
        }

        function loadImages() {
          LocationDetailService.getComments($routeParams.id).then(function(result) {
              self.comments = result;
          });
        }

        this.uploadVideo = function(file) {
            LocationVideoService.uploadVideo(file, self.detail);
        }

    }

    LocationDetailController.prototype.$inject = ['LocationDetailService', '$routeParams', '$location', 'user', 'LocationVideoService'];

    function NewLocationController(NavigationService, LocationDetailService, $routeParams, $location, $rootScope) {
        var self = this;
        self.location = {};
        //this.stars = _.range(0,6);

        if ($routeParams.id){
            LocationDetailService.find($routeParams.id).then(function(result) {
                self.location = result;
            });
        }

        this.save = function(frm) {
            if(!frm.$valid) {
                return;
            }
            if (self.location.$id){
                LocationDetailService.update(self.location)
                $location.path('/locations/' + self.location.$id);
            }else {
                LocationDetailService.create(self.location).then(function (data) {
                    $location.path('/locations/' + data.name());
                }, function (err) {
                    alert(err);
                })
            };
        };

        this.backToList = function() {
            $location.path('/');
        };

        NavigationService.loadNavigationElements().then(function(result) {
            result.$loaded(function(data) {
                self.subtypes = _.chain(data).map('subcategory').flatten().uniq().value();
            });
        });

        $rootScope.$on('LocationSelected', function(e, position) {
            self.location.address = position.formatted_address;
            var loc = position.geometry.location;
            self.location.lat = loc.lat();
            self.location.long = loc.lng();
        });

    }

    NewLocationController.prototype.$inject = ['NavigationService', 'LocationDetailService', '$routeParams', '$location', '$rootScope'];

    function LocationVideoController($scope, $sce, LocationVideoService) {
        var self = this;
        $scope.$watch(function() {
            return self.locationVideo;
        }, function(val) {
            if(angular.isDefined(val)) {
                LocationVideoService.loadVideos(val).$loaded(function(result) {
                    var url = (angular.isDefined(result) && result.length > 0) ? _.first(result).videoUrl : undefined;
                    if(angular.isDefined(url)) {
                        self.url = $sce.trustAsResourceUrl(url + '?rel=0');
                    }
                });
            }
        });
    }

    LocationVideoController.prototype.$inject = ['$scope', 'LocationDetailService', '$sce', 'LocationVideoService'];

    function LocationVideoService(Auth, $log, $firebaseArray, Ref) {

        var self = this;

        this.uploadVideo = function(file, detail) {
            if(!angular.isDefined(Auth.$getAuth())) {
                return;
            }
            var metadata = {
                snippet: {
                    title: 'Accessopolis review: ' + detail.text,
                    description: window.location.href,
                    tags: ['accessopolis'],
                    categoryId: undefined
                }
            };
            var fd = new FormData();
            fd.append('file', file);

            var xhr = new XMLHttpRequest();

            xhr.open('POST', 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet', true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + Auth.$getAuth().google.accessToken);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('X-Upload-Content-Length', file.size);
            xhr.setRequestHeader('X-Upload-Content-Type', file.type);

            xhr.onload = function(e) {
                if (e.target.status < 400) {
                    var url = e.target.getResponseHeader('Location');
                    var content = file;

                    var xhr = new XMLHttpRequest();
                    xhr.open('PUT', url, true);
                    xhr.setRequestHeader('Content-Type', file.type);
                    xhr.setRequestHeader('X-Upload-Content-Type', file.type);
                    xhr.onload = function(e) {
                        var actualResponse = JSON.parse(e.target.response);
                        self.loadVideos(detail).$add({videoUrl: 'https://www.youtube.com/embed/'+ actualResponse.id, thumbnail: actualResponse.snippet.thumbnails.default.url});
                    };
                    xhr.onerror = function(err) {
                        $log.error(err);
                    };
                    xhr.send(content);
                } else {
                    $log.error(e);
                }
            }.bind(this);
            xhr.send(JSON.stringify(metadata));
        };

        this.loadVideos = function(detail) {
            return $firebaseArray(Ref.child('videos/'+detail.$id));
        };

    }

    LocationVideoService.prototype.$inject = ['Auth', '$log', '$firebaseArray', 'Ref'];

})();
