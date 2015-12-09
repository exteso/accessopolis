(function() {
'use strict';


angular.module('accessopolisApp', ['ngRoute', 'firebase'])
  .constant('IMGUR_API_KEY', 'Client-ID 7a37861e931f779')
  .constant('GOOGLE_API_KEY', 'AIzaSyCbm7ot6UqPk9I7sQVu3Z3PeU7hvwT0pbU')
  //firebase related conf
  .constant('FBURL', 'https://accessopolis.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['google'])
  
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<ap-search-box></ap-search-box>'
      }).
      when('/location/:identifier', {
        template: '<ap-location identifier="identifier"></ap-location>',
        controller: ['$routeParams', '$scope', function($routeParams, $scope) {
          $scope.identifier = $routeParams.identifier;
        }]
      });
  
  }])
  
  
  //firebase related objects
  .factory('Ref', ['$window', 'FBURL', function($window, FBURL) {
    return new $window.Firebase(FBURL);
  }])
  .factory('Auth', ['$firebaseAuth', 'Ref', function($firebaseAuth, Ref) {
    return $firebaseAuth(Ref);
  }]);
  //
  
  
})();

(function() {

angular.module('accessopolisApp').service('UserService', ['$q', '$firebaseObject', 'Ref', '$firebaseArray', UserService]);


function UserService($q, $firebaseObject, Ref, $firebaseArray) {

  function find(id) {
        return $q(function(resolve, reject) {
            $firebaseObject(Ref.child('users/'+id)).$loaded(function(val) {
                resolve(val);
            });
        });
    };
    
    //
    this.find = find;
}

})()





(function() {

  angular.module('accessopolisApp').component('apLoginStatus', {
    controller: ['Auth', 'Ref', '$firebaseObject', function(Auth, Ref, $firebaseObject) {
    
      var vm = this;
    
      Auth.$onAuth(function(authData) {
        if(authData) {
          vm.user = Auth.$getAuth();
          vm.profile = $firebaseObject(Ref.child('users/' + vm.user.uid));
        } else {
          vm.user = undefined;
          vm.profile = undefined;
        }
      });
    
    
      function redirect() {
        //TODO: complete
      }
      
      function showError() {
        //TODO: complete
      }
      
      function logout() {
        Auth.$unauth();
      }
    
    
      function oauthLogin() {
        Auth.$authWithOAuthPopup('google', { scope: 'email https://www.googleapis.com/auth/youtube.upload' }).then(redirect, showError);
      }
      
      
      //
      this.oauthLogin = oauthLogin;
      this.logout = logout;
    }],
    template: ['<div ng-if="!apLoginStatus.user">',
                 '<button class="btn btn-primary hidden-xs btn-lg pull-right navbar-btn" ng-click="apLoginStatus.oauthLogin()">Accedi con Google</button>',
                 '<button class="btn btn-primary visible-xs btn-sm pull-right navbar-btn" ng-click="apLoginStatus.oauthLogin()">Accedi</button>',
               '</div>',
               '<div ng-if="apLoginStatus.user" class="accessopolis-profile">',
                 '<button role="button" ng-click="apLoginStatus.logout()" class="btn btn-danger navbar-btn pull-right hidden-xs">Log Out</button>',
                 '<button role="button" ng-click="apLoginStatus.logout()" class="btn btn-danger btn-sm navbar-btn pull-right visible-xs">Log Out</button>',
                 '<div class="accessopolis-profile-icon hidden-xs" style="background-image: url(\'{{apLoginStatus.user.google.cachedUserProfile.picture}}\')"></div>',
                 '<div class="accessopolis-profile-name hidden-xs">',
                   '<a ng-href="{{apLoginStatus.user.google.cachedUserProfile.link}}" target="_blank" ng-bind="apLoginStatus.user.google.cachedUserProfile.name"></a>',
                 '</div>',
               '</div>',
              ].join('')
  });

})();

(function() {

  angular.module('accessopolisApp').component('apSearchBox', {
    controller: ['$location', 'SearchBoxService', function($location, SearchBoxService) {
    
      var vm = this;
      
      // initialize search if we have a search parameter!
      if($location.search().hasOwnProperty('search')) {
        vm.toSearch = $location.search().search;
        search();
      }
      //
    
      function search() {
        var toSearch = vm.toSearch || '';
        $location.search('search', toSearch);
        SearchBoxService.search({text: toSearch, type: undefined}).then(function(searchResult) {
          vm.searchResult = searchResult;
        });
      }
      
      //
      this.search = search;
    }],
    
    template: ['<div class="container">',
                 '<form class="location-search" ng-submit="apSearchBox.search()">',
                   '<div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12 accessopolis-search-field">',
                     '<div class="accessopolis-search-box row">',
                       '<span class="accessopolis-search-icon"><i class="fa fa-search fa-2x"></i></span>',
                       '<input type="text" class="form-control input-lg" placeholder="Cerca una struttura o località" ng-model="apSearchBox.toSearch">',
                     '</div>',
                     '<div class="row top-buffer" style="text-align: center;">',
                       '<button type="submit" class="btn btn-primary btn-lg col-md-12" style="width: 100%;">Cerca</button>',
                     '</div>',
                   '</div>',
                 '</form>',
                 '<div ng-if="apSearchBox.searchResult"><ap-search-result-list found="apSearchBox.searchResult"></ap-search-result-list></div>',
              ,'</div>'].join('')
  
  });
  
})();

(function() {

  angular.module('accessopolisApp')
    .service('SearchBoxService', ['$q', 'Ref', '$firebaseArray', SearchBoxService]);
  
  
  function SearchBoxService($q, Ref, $firebaseArray) {
    function search(criterion) {
      return $q(function(resolve, reject) {
        var list = $firebaseArray(Ref.child('locations'));
        list.$loaded(function(data) {
          var filteredResults = _.chain(data).filter(function(e) {
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
  
  
    this.search = search;
  }
  
  
})();

(function() {

  angular.module('accessopolisApp').component('apSearchResultList', {
    bindings: {
      found: '='
    },
    template: ['<div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12"><div class="row">',
                 '<ul>',
                   '<li ng-repeat="found in apSearchResultList.found">',
                     '<ap-search-result result="found"></ap-search-result>',
                   '</li>',
                 '</ul>',
               '</div></div>'].join('')
  })
  
})();

(function() {

  angular.module('accessopolisApp').component('apSearchResult', {
    bindings: {
      result: '='
    },
    controller: ['$location', function($location) {
    
      var vm = this;
    
      function showDetail() {
        $location.path('/location/'+vm.result.$id);
      }
      
      
      //
      this.showDetail = showDetail;
    
    }],
    template: ['<div><div>',
                  '<div class="ap-search-result-icon-container hidden-xs">', iconTemplate(),'</div>',
                  '<div class="ap-search-result-description" ng-click="apSearchResult.showDetail()"><a href="">', 
                    '<h3 class="ap-search-result-text">{{::apSearchResult.result.text}}</h3>',
                    '<div class="ap-search-result-address">{{::apSearchResult.result.address}}</div>',
                  '</a></div>',
                  '<div class="ap-search-result-rating hidden-xs"><ap-rating location="apSearchResult.result"></ap-rating></div>',
               '</div></div>'].join('')
  })
  
  
  
  
  function iconTemplate() {
    return [ '<span class="fa fa-thumb-tack" ng-class="{\'fa-coffee\': apSearchResult.result.type === \'bar\',',
                         '\'fa-cutlery\': apSearchResult.result.type == \'restaurant\',',
                         '\'fa-bed\': apSearchResult.result.type === \'hotels\',',
                         '\'fa-beer\': apSearchResult.result.type === \'pub\',',
                         '\'fa-train\': apSearchResult.result.type === \'train-stations\'}">',
            '</span>'].join('');
  }
})();

(function() {

  angular.module('accessopolisApp').component('apLocation', {
  
    template: topTemplate() + bodyTemplate(),
    bindings: {
      identifier:'=',
    },
    controller: ['$location', 'LocationService', 'Auth', function($location, LocationService, Auth) {
      var vm = this;
      
      Auth.$onAuth(function(authData) {
        vm.isAuth = !!authData;
      });
        
      
      LocationService.find(this.identifier).then(function(location) {
        vm.location = location;
      });
      
      LocationService.getComments(this.identifier).then(function(comments) {
        vm.comments = comments;
      });
      
      LocationService.getMedia(this.identifier).then(function(media) {
        vm.media = media;
      });
      
      function backToHome() {
        $location.path('/');
      }
      
      function addNewComment() {
        vm.savingComment = true;
        
        vm.comments.$add({text: vm.newComment, userId : Auth.$getAuth().uid}).then(function() {
          vm.newComment = null;
          vm.savingComment = false;
        });        
      };
      
      
      this.backToHome = backToHome;
      this.addNewComment = addNewComment;
    }]
  })

  function topTemplate() {
    return [
    '<div class="accessopolis-location-detail col-xs-12" style="background: #000 !important;">',
        '<div class="container accessopolis-location-detail-header-wrap">',
            '<div class="accessopolis-location-detail-back col-md-12 col-sm-12 col-xs-12">',
                '<button type="button" data-ng-click="apLocation.backToHome()" class="btn btn-primary btn-xs">',
                    '<span class="fa fa-chevron-left"></span> <span>Torna alla lista</span>',
                '</button>',
            '</div>',
            '<div class="accessopolis-location-detail-header col-md-12 col-sm-12 col-xs-12">',
                '<div class="accessopolis-location-detail-header-title col-md-8 col-sm-8 col-xs-12">',
                    '<h1>{{apLocation.location.text}}</h1>',
                    '<div>{{apLocation.location.address}}</div>',
                '</div>',
                '<div class="col-md4 col-sm-4 col-xs-4 hidden-xs hidden-sm accessopolis-location-detail-header-rating "><ap-rating ng-if="apLocation.location" location="apLocation.location"></ap-rating></div>',
            '</div>',
      '</div>',
    '</div>'
    ].join('');
  }
  
  function bodyTemplate() {
    return ['<div class="col-xs-12">',
              '<div class="container accessopolis-location-detail-content">',
                '<div class="accessopolis-bg-white col-md-12 col-sm-12 col-xs-12 accessopolis-location-detail-content-slide">'+imagesAndLocationTemplate()+'</div>',
                '<div class="col-md-12 col-sm-12 col-xs-12 accessopolis-bg-white" style="padding-bottom: 50px; margin-bottom: 20px;  margin-top: 10px;">', //comments
                   '<h1>Commenti:</h1>',
                   '<ul class="list-group col-md-12 col-sm-12 col-xs-12" style="list-style-type: none">',
                    commentTemplate(),
                   '</ul>',
                   insertCommentTemplate(),
                '</div>',
              '</div>',
            '</div>'].join('');
  }
  
  
  function commentTemplate() {
    return ['<li class="list-group-item" ng-repeat="comment in apLocation.comments track by comment.$id" style="float: left; width: 100%;">',
              '<div style="width: 50px; height: 50px; float: left; ">',
                '<div style="float: left; overflow:hidden;width: 50px; height: 50px; background: #ccc; color:#fff; text-align: center; border-radius: 50%;  line-height: 50px;border:1px solid #ccc; ">',
                  '<ap-avatar user-id="comment.userId"></ap-avatar>',
                '</div>',
              '</div>',
              '<div style="float: left; height: 50px; line-height: 50px; margin-left: 10px; " ng-bind="::comment.text"></div>',
            '</li>',
            '<li ng-if="apLocation.comments.length == 0">Nessun commento!</li>'].join('');
  }
  
  function insertCommentTemplate() {
    return ['<div class="col-md-12 col-sm-12 col-xs-12" ng-if="apLocation.isAuth">',
                    '<form ng-submit="apLocation.addNewComment()">',
                        '<div class="form-group">',
                            '<input type="text" class="form-control" placeholder="Il vostro commento..." ng-model="apLocation.newComment">',
                        '</div>',
                        '<button type="submit" class="btn btn-sm btn-primary" ng-disabled="!apLocation.newComment || apLocation.savingComment">Commenta</button>',
                    '</form>',
                '</div>'].join('');
  }
  
  function imagesAndLocationTemplate() {
    return ['<div class="col-xs-12 col-md-6 ap-location-media">',mediaTemplate(),'</div>',
            '<div class="col-xs-12 col-md-6 ap-location-google-map" data-ng-if="apLocation.location">',
              locationTemplate(),
            '</div>'].join('');
  }
  
  
  function mediaTemplate() {
    return ['<div><img ng-if="apLocation.media[0]" ng-src="{{apLocation.media[0].imageThumbnailUrl}}" class="img-responsive center-block"></div>'].join('');
  }
  
  
  function locationTemplate() {
    return ['<a href="https://google.com/maps?z=12&t=m&q=loc:{{apLocation.location.lat}}+{{apLocation.location.long}}" title="{{apLocation.location.text}}, {{apLocation.location.address}}" target="_blank">',
              '<div class="hidden-xs" style="height:400px;width:400px; background-image: url(\'https://maps.googleapis.com/maps/api/staticmap?center={{apLocation.location.lat}},{{apLocation.location.long}}&zoom=15&size=400x400&maptype=roadmap&markers=color:red%7Clabel:C%7C{{apLocation.location.lat}},{{apLocation.location.long}}\'); background-size: cover"></div>',
              '<div class="visible-xs" style="height:244px;width:244px; background-image: url(\'https://maps.googleapis.com/maps/api/staticmap?center={{apLocation.location.lat}},{{apLocation.location.long}}&zoom=15&size=244x244&maptype=roadmap&markers=color:red%7Clabel:C%7C{{apLocation.location.lat}},{{apLocation.location.long}}\'); background-size: cover"></div>',
            '</a>'].join('');
  }


})();

(function() {


  angular.module('accessopolisApp').service('LocationService', ['$q', '$firebaseObject', 'Ref', '$firebaseArray', LocationService]);


  function LocationService($q, $firebaseObject, Ref, $firebaseArray) {
  
    function find(id) {
        return $q(function(resolve, reject) {
            $firebaseObject(Ref.child('locations/'+id)).$loaded(function(val) {
                resolve(val);
            });
        });
    }

    function getComments(id) {
        return $q(function(resolve, reject) {
            $firebaseArray(Ref.child('comments/'+id)).$loaded(function(val) {
                resolve(val);
            });
        });
    }

    function getImages(id) {
        return $q(function(resolve, reject) {
          $firebaseArray(Ref.child('images/'+id)).$loaded(function(val) {
            resolve(val);
          });
        });
    }
    
    function getVideos(id) {
      return $q(function(resolve, reject) {
          $firebaseArray(Ref.child('videos/'+id)).$loaded(function(val) {
            resolve(val);
          });
        });
    }
    
    function getMedia(id) {
      return $q.all([getImages(id), getVideos(id)]).then(function(imagesAndVideos) {
      
        var medias = [];
        angular.forEach(imagesAndVideos[0], function(image) {
          image.imageThumbnailUrl = image.imageUrl;
          image.mediaType = 'image';
          medias.push(image);
        });
        
        angular.forEach(imagesAndVideos[1], function(video) {
          image.imageThumbnailUrl = image.thumbnail.replace(/default.+$/,"0.jpg");
          image.mediaType = 'video';
          medias.push(video);
        });
        
        return medias;
      });
    }

    function update(location){
        if (location.$id){
            var obj = $firebaseObject(Ref.child('locations/'+location.$id));

            obj.$loaded().then(function() {
                angular.extend(obj, location);
                return obj.$save();
            });
            return obj;
        }
    }

    function create(location) {
        return $firebaseArray(Ref.child('locations')).$add(location);
    }

    function rate(newRate){
        //FIXME
        return $firebaseArray(Ref.child('ratings')).$add(newRate);
    }
    
    //
    this.find = find;
    this.getComments = getComments;
    this.getImages = getImages;
    this.update = update;
    this.create = create;
    this.rate = rate;
    this.getMedia = getMedia;
  }

    
})();

(function() {

  angular.module('accessopolisApp').component('apRating', {
    bindings: {
      location:'=',
    },
    controller: ['RatingService', function(RatingService) {
      var vm = this;
      RatingService.getRating(this.location.$id).then(function(rating) {
        vm.rating = rating;
      });
    }],
    
    
    template: templateRating(),
  });


  function templateRating() {
    return ['<div><div>',
        '<div class="ap-rating-rating">{{apRating.rating.staff === undefined ? \'N/A\' : apRating.rating.staff}}</div>',
        '<div class="ap-rating-icon-and-text">',
            '<span class="fa fa-user-md"></span>',
            '<div class="hidden-xs">Staff</div>',
        '</div>',
    '</div>',
    '<div>',
        '<div class="ap-rating-rating">{{apRating.rating.public === undefined ? \'N/A\' : apRating.rating.public}}</div>',
        '<div class="ap-rating-icon-and-text">',
            '<span class="fa fa-star" ></span><br />',
            '<div class="hidden-xs">Pubblico</div>',
        '</div>',
    '</div></div>'].join('');
  }

})();

(function() {

angular.module('accessopolisApp').service('RatingService', ['$q', 'Ref', '$firebaseArray', RatingService]);

  function RatingService($q, Ref, $firebaseArray) {


    function calculateRate(total, list){
      if (!list || list.length == 0){
        return undefined;
      }
      return (total / list.length).toFixed(1).toString();
    }


    function getRating(locationId) {
      return $q(function(resolve, reject) {
        $firebaseArray(Ref.child('ratings').orderByChild('locationId').equalTo(locationId)).$loaded(function(res) {
          resolve(res);
        });
      }).then(function(ratings) {
        var ratingByType = _.groupBy(ratings, 'userType');
        var totalStaff = _.sum(ratingByType['expert'], 'rate');
        var totalPublic = _.sum(ratingByType['public'], 'rate');
        
        return {
          public: calculateRate(totalPublic, ratingByType['public']),
          staff: calculateRate(totalStaff, ratingByType['expert'])
        };
      });
    }
    
    //
    this.getRating = getRating;

  }


})();

(function() {

  angular.module('accessopolisApp').component('apAvatar', {
    bindings: {
      'userId': '='
    },
    
    template: '<span ng-if="apAvatar.user === undefined"><span class="fa fa-user"></span></span>'+
        '<span ng-if="apAvatar.user" title="{{apAvatar.user.name}}" style="'+
          'display: block;'+
          'height: 50px;'+
          'width: 50px;'+
          'background-size: cover;" ng-style="{\'background-image\': \'url({{apAvatar.user.imageURL}})\'}"></span>',
    
    controller: ['UserService', function(UserService) {
      var vm = this;
      UserService.find(this.userId).then(function(user) {
        vm.user = user;
      });
    }]
    
  });
})();
