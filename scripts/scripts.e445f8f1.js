'use strict';

/**
 * @ngdoc overview
 * @name accessopolisApp
 * @description
 * # accessopolisApp
 *
 * Main module of the application.
 */
angular.module('accessopolisApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.ref',
    'firebase.auth',
    'accessopolis.navigation',
    'accessopolis.search',
    'accessopolis.locationDetail',
    'accessopolis.rating',
    'pascalprecht.translate',
    'ngImgur',
    'ui.bootstrap'
  ])
    .constant('IMGUR_API_KEY', 'Client-ID 7a37861e931f779')
    .constant('GOOGLE_API_KEY', 'AIzaSyCbm7ot6UqPk9I7sQVu3Z3PeU7hvwT0pbU')
    .config(["$translateProvider", function ($translateProvider) {
        $translateProvider.translations('en', {
            'public-transport': 'Public Transports',
            'airports': 'Airports',
            'train-stations': 'Train Stations',
            'bus': 'Buses',
            'taxis': 'Taxis',
            'ships': 'Ships',
            'holidays': 'Holidays',
            'hotels':'Hotels',
            'hostels':'Hostels',
            'farmhouse':'Farmhouses',
            'camping':'Campings',
            'food':'Food',
            'restaurant':'Restaurants',
            'bar':'Bar',
            'pub':'Pubs',
            'religion': 'Religion',
            'mosque': 'Mosques',
            'church': 'Churches',
            'synagogue': 'Temples',
            'sport': 'Sport',
            'culture': 'Culture and freetime',
            'stadium':'Stadium',
            'sports-arena': 'Sports Arena',
            'indoor-pool': 'Indoor Pool',
            'swimming-pool': 'Swimming Pool',
            'ice-rink': 'Ice Rink',
            'cinema': 'Cinema',
            'theatre': 'Theatre',
            'museum': 'Museum',
            'library': 'Library',
            'accessopolis.rating.expert': 'Experts',
            'accessopolis.rating.public': 'Public',
            'accessopolis.accessibility-evaluation': 'Accessibility Evaluation',
            'accessopolis.accessibility-evaluation-mobility': 'Mobility',
            'accessopolis.accessibility-evaluation-hearing': 'Hearing',
            'accessopolis.accessibility-evaluation-vision': 'Vision',
            'accessopolis.accessibility-evaluation-mental': 'Mental',
            'accessopolis.insert-new-location': 'Insert new location',
            'accessopolis.edit-location': 'Edit',
            'accessopolis.location.description': 'Location Description',
            'accessopolis.error.minlength': 'The value inserted is too short',
            'accessopolis.error.maxlength': 'The value inserted is too long',
            'accessopolis.error.required': 'This field is required',
            'accessopolis.error.url': 'Url is not valid. It must start with http:// or https://',
            'accessopolis.location.type': 'Location Type',
            'accessopolis.location.address': 'Location Address',
            'accessopolis.cancel': 'Cancel',
            'accessopolis.save': 'Save',
            'accessopolis.selected.categories': 'Selected Categories',
            'accessopolis.location.not-found': 'No locations found',
            'accessopolis.location.new': 'Add Location',
            'accessopolis.location.website' : 'Website address',
            'report-a-problem': 'Report a problem',
            'accessopolis.back-to-list': 'Back to list',
            'accessopolis.vote.now' : 'Leave your vote',
            'accessopolis.voting': 'Vote!',
            'accessopolis.welcome': 'welcome to Accessopolis.ch',
            'accessopolis.back-to-home': 'Back to home',
            'accessopolis.exit' : 'Logout',
            'accessopolis.sign-in' : 'Login',
            'accessopolis.comment': 'Comment',
            'accessopolis.insert.video': 'Upload new video',
            'accessopolis.type': 'Type',
            'accessopolis.description': 'Description',
            'accessopolis.upload':'Upload'
        });
        $translateProvider.translations('it', {
            'public-transport': 'Trasporti Pubblici',
            'airports': 'Aeroporti',
            'train-stations': 'Stazioni Ferroviarie',
            'bus': 'Autobus',
            'taxis': 'Taxi',
            'ships': 'Imbarcazioni',
            'holidays': 'Vacanze',
            'hotels':'Hotel',
            'hostels':'Ostelli',
            'farmhouse':'Colonie',
            'camping':'Campeggi',
            'food':'Cibo',
            'restaurant':'Ristoranti',
            'bar':'Bar',
            'pub':'Pubs',
            'religion': 'Luoghi di Culto',
            'mosque': 'Moschee',
            'church': 'Chiese',
            'synagogue': 'Sinagoghe',
            'sport': 'Sport',
            'culture': 'Cultura e tempo libero',
            'stadium': 'Stadi',
            'sports-arena': 'Campi Sportivi',
            'indoor-pool': 'Piscine coperte',
            'swimming-pool': 'Piscine scoperte',
            'ice-rink': 'Pista di Ghiaccio',
            'cinema': 'Cinema',
            'theatre': 'Teatri',
            'museum': 'Musei',
            'library': 'Biblioteche',
            'accessopolis.rating.expert': 'Esperti',
            'accessopolis.rating.public': 'Pubblico',
            'accessopolis.accessibility-evaluation': 'Valutazione Accessibilità',
            'accessopolis.accessibility-evaluation-mobility': 'Fisiche',
            'accessopolis.accessibility-evaluation-hearing': 'Uditive',
            'accessopolis.accessibility-evaluation-vision': 'Visive',
            'accessopolis.accessibility-evaluation-mental': 'Mentali',
            'accessopolis.insert-new-location': 'Inserire una nuova struttura',
            'accessopolis.edit-location': 'Modifica',
            'accessopolis.location.description': 'Descrizione della struttura',
            'accessopolis.error.minlength': 'Il valore inserito è troppo corto',
            'accessopolis.error.maxlength': 'Il valore inserito è troppo lungo',
            'accessopolis.error.required': 'Questo campo è obbligatorio',
            'accessopolis.error.url': 'Url non è valida. Deve iniziare con http:// o https://',
            'accessopolis.search.suggestions': 'Cerca una struttura o località',
            'accessopolis.location.type': 'Tipologia della struttura',
            'accessopolis.location.address': 'Indirizzo della struttura',
            'accessopolis.cancel': 'Annulla',
            'accessopolis.save': 'Salva',
            'accessopolis.selected.categories': 'Categorie Selezionate',
            'accessopolis.location.not-found': 'Nessuna struttura trovata',
            'accessopolis.location.new': 'Aggiungi',
            'accessopolis.back-to-list': 'Torna alla lista',
            'accessopolis.location.website' : 'Indirizzo sito web',
            'report-a-problem': 'Segnala un problema',
            'accessopolis.vote.now' : 'Dai il tuo voto',
            'accessopolis.voting': 'Vota!',
            'accessopolis.welcome': 'benvenuto/a in Accessopolis.ch',
            'accessopolis.back-to-home': 'Torna ad Accessopolis',
            'accessopolis.exit' : 'Logout',
            'accessopolis.sign-in' : 'Accedi con Google',
            'accessopolis.comment': 'Commenta',
            'accessopolis.insert.video': 'Upload Video',
            'accessopolis.type':'Tipologia',
            'accessopolis.description': 'Descrizione',
            'accessopolis.upload':'Upload'
        });
        $translateProvider.preferredLanguage('it');
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
        $translateProvider.directivePriority(222); //see https://github.com/angular-translate/angular-translate/issues/949
    }])
    .controller('AppCtrl', ["$scope", "Auth", "$translate", "$firebaseObject", "Ref", function ($scope, Auth, $translate, $firebaseObject, Ref) {

        Auth.$onAuth(function(authData) {
          if(authData) {
            $scope.user = Auth.$getAuth();
            $scope.profile = $firebaseObject(Ref.child('users/' + $scope.user.uid));
          } else {
            $scope.user = undefined;
            $scope.profile = undefined;
          }
        });


        $scope.lang = "it";
        $scope.changeLanguage = function (key) {
            $scope.lang = key;
            $translate.use(key);
        };
    }]);

'use strict';

/**
 * @ngdoc function
 * @name accessopolisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the accessopolisApp
 */
angular.module('accessopolisApp')
  .controller('MainCtrl', ["$scope", function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

angular.module('firebase.config', [])
  .constant('FBURL', 'https://accessopolis.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['google'])

  .constant('loginRedirectPath', '/login');

angular.module('firebase.ref', ['firebase', 'firebase.config'])
  .factory('Ref', ['$window', 'FBURL', function($window, FBURL) {
    'use strict';
    return new $window.Firebase(FBURL);
  }]);

'use strict';
/**
 * @ngdoc function
 * @name accessopolisApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('accessopolisApp')
  .controller('ChatCtrl', ["$scope", "Ref", "$firebaseArray", "$timeout", function ($scope, Ref, $firebaseArray, $timeout) {
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.messages = $firebaseArray(Ref.child('messages').limitToLast(10));

    // display any errors
    $scope.messages.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addMessage = function(newMessage) {
      if( newMessage ) {
        // push a message to the end of the array
        $scope.messages.$add({text: newMessage})
          // display any errors
          .catch(alert);
      }
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  }]);

'use strict';

angular.module('accessopolisApp')
  .filter('reverse', function() {
    return function(items) {
      return angular.isArray(items)? items.slice().reverse() : [];
    };
  }).filter('imgurThumbnail', function() {
    return function(imageUrl, thumbnailType) {
      if(imageUrl) {
        var imgSeparatorIdx = imageUrl.lastIndexOf('.');
        if (imgSeparatorIdx !== -1) {
          imageUrl = imageUrl.substr(0, imgSeparatorIdx) + thumbnailType + imageUrl.substr(imgSeparatorIdx);
        }
      }
      return imageUrl;
    }
  });

(function() {
  'use strict';
  angular.module('firebase.auth', ['firebase', 'firebase.ref'])

    .factory('Auth', ["$firebaseAuth", "Ref", function($firebaseAuth, Ref) {
      return $firebaseAuth(Ref);
    }]);
})();

'use strict';
/**
 * @ngdoc function
 * @name accessopolisApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('accessopolisApp')
  .controller('LoginCtrl', ["$scope", "Auth", "$location", function ($scope, Auth, $location) {

        $scope.oauthLogin = function(provider, dropMenu) {

        if(dropMenu){
            $(".btn-navbar").click(); //bootstrap 2.x
            $(".navbar-toggle").click() //bootstrap 3.x by Richard
        }

        $scope.err = null;

        Auth.$authWithOAuthPopup(provider, { scope: 'email https://www.googleapis.com/auth/youtube.upload' }).then(redirect, showError);
    };

    $scope.anonymousLogin = function() {
      $scope.err = null;
      Auth.$authAnonymously({rememberMe: true}).then(redirect, showError);
    };

    function redirect() {
      $location.path('/account');
    }

    function showError(err) {
      $scope.err = err;
    }


  }]);

'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('accessopolisApp')
  .controller('AccountCtrl', ["$scope", "user", "Auth", "Ref", "$firebaseObject", "$timeout", "$location", function ($scope, user, Auth, Ref, $firebaseObject, $timeout, $location) {
    $scope.user = user;
    $scope.details = user.google;

    $scope.logout = function(dropMenu) {
        if(dropMenu){
            $(".btn-navbar").click(); //bootstrap 2.x
            $(".navbar-toggle").click() //bootstrap 3.x by Richard
        }

        Auth.$unauth();
        $location.path('/');
    };

    $scope.messages = [];
    var profile = $firebaseObject(Ref.child('users/'+user.uid));
    profile.$bindTo($scope, 'profile').then(function() {

        //could we move this logic inside Auth.$onAuth in app.js
        if (user.google){
            $scope.profile.email = user.google.email;  // will be saved to the database
            $scope.profile.name = user.google.displayName;   // will be saved to the database
            $scope.profile.imageURL =  user.google.profileImageURL; // will be saved to the database
            if (!$scope.profile.type){
                $scope.profile.type = 'public'; //if a user has no type property defined, it will be set as public
            }
        }
      });
  }]);

'use strict';
/**
 * @ngdoc function
 * @name accessopolisApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * A CRUD tool for managing Categories using AngularFire to manage a synchronized list.
 */
angular.module('accessopolisApp')
  .controller('CategoryCtrl', ["$scope", "Ref", "$firebaseArray", "$firebaseObject", "$timeout", function ($scope, Ref, $firebaseArray, $firebaseObject, $timeout) {
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.categories = $firebaseArray(Ref.child('categories').limitToLast(10));

    // display any errors
    $scope.categories.$loaded().catch(alert);

    // provide a method for adding a Category
    $scope.addCategory = function(newCategory) {
      if( newCategory ) {
        // push a category to the end of the array
        $scope.categories.$add(newCategory)
          // display any errors
          .catch(alert);
      }
    };

    $scope.addSubcategory = function(category, newSubcategory){
      if( newSubcategory ) {

        var catRef = $firebaseObject(Ref.child('categories/'+category.$id));
        catRef.$bindTo($scope, 'selectedCat').then(function() {

          //var subcatRef = $firebaseArray(Ref.child('categories/'+category.$id+'/subcategory'));
          var subcatRef = $firebaseArray(Ref.child('categories/'+category.$id+'/subcategory'))
          subcatRef.$add(newSubcategory);  // will be saved to the database
          //ref.set({ foo: "baz" });  // this would update the database and $scope.data
        });
      }
    };


    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  }]);

/**
 * @ngdoc function
 * @name accessopolisApp.directive:ngShowAuth
 * @description
 * # ngShowAuthDirective
 * A directive that shows elements only when user is logged in. It also waits for Auth
 * to be initialized so there is no initial flashing of incorrect state.
 */
angular.module('accessopolisApp')
  .directive('ngShowAuth', ['Auth', '$timeout', function (Auth, $timeout) {
    'use strict';

    return {
      restrict: 'A',
      link: function(scope, el) {
        el.addClass('ng-cloak'); // hide until we process it

        function update() {
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            el.toggleClass('ng-cloak', !Auth.$getAuth());
          }, 0);
        }

        Auth.$onAuth(update);
        update();
      }
    };
  }]);


/**
 * @ngdoc function
 * @name accessopolisApp.directive:ngHideAuth
 * @description
 * # ngHideAuthDirective
 * A directive that shows elements only when user is logged out. It also waits for Auth
 * to be initialized so there is no initial flashing of incorrect state.
 */
angular.module('accessopolisApp')
  .directive('ngHideAuth', ['Auth', '$timeout', function (Auth, $timeout) {
    'use strict';

    return {
      restrict: 'A',
      link: function(scope, el) {
        el.addClass('ng-cloak'); // hide until we process it
        function update() {
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            el.toggleClass('ng-cloak', !!Auth.$getAuth());
          }, 0);
        }

        Auth.$onAuth(update);
        update();
      }
    };
  }]);

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
        template: '<span class="btn btn-primary btn-file">Browse <input type="file"  accept="imageUploadCtrl.accept" capture="camera" ng-show-auth></span>'
      };
}]);

'use strict';
/**
 * @ngdoc overview
 * @name accessopolisApp:routes
 * @description
 * # routes.js
 *
 * Configure routes for use with Angular, and apply authentication security
 * Add new routes using `yo angularfire:route` with the optional --auth-required flag.
 *
 * Any controller can be secured so that it will only load if user is logged in by
 * using `whenAuthenticated()` in place of `when()`. This requires the user to
 * be logged in to view this route, and adds the current user into the dependencies
 * which can be injected into the controller. If user is not logged in, the promise is
 * rejected, which is handled below by $routeChangeError
 *
 * Any controller can be forced to wait for authentication to resolve, without necessarily
 * requiring the user to be logged in, by adding a `resolve` block similar to the one below.
 * It would then inject `user` as a dependency. This could also be done in the controller,
 * but abstracting it makes things cleaner (controllers don't need to worry about auth state
 * or timing of displaying its UI components; it can assume it is taken care of when it runs)
 *
 *   resolve: {
 *     user: ['Auth', function(Auth) {
 *       return Auth.$getAuth();
 *     }]
 *   }
 *
 */
angular.module('accessopolisApp')

/**
 * Adds a special `whenAuthenticated` method onto $routeProvider. This special method,
 * when called, invokes Auth.$requireAuth() service (see Auth.js).
 *
 * The promise either resolves to the authenticated user object and makes it available to
 * dependency injection (see AccountCtrl), or rejects the promise if user is not logged in,
 * forcing a redirect to the /login page
 */
  .config(['$routeProvider', 'SECURED_ROUTES', function($routeProvider, SECURED_ROUTES) {
    // credits for this idea: https://groups.google.com/forum/#!msg/angular/dPr9BpIZID0/MgWVluo_Tg8J
    // unfortunately, a decorator cannot be use here because they are not applied until after
    // the .config calls resolve, so they can't be used during route configuration, so we have
    // to hack it directly onto the $routeProvider object
    $routeProvider.whenAuthenticated = function(path, route) {
      route.resolve = route.resolve || {};
      route.resolve.user = ['Auth', function(Auth) {
        return Auth.$requireAuth();
      }];
      $routeProvider.when(path, route);
      SECURED_ROUTES[path] = true;
      return $routeProvider;
    };
  }])
    .provider('user', function UserProvider() {
        this.$get = ['Auth', function(Auth) {
            return Auth.$requireAuth();
        }];
    })

  // configure views; whenAuthenticated adds a resolve method to ensure users authenticate
  // before trying to access that route
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })

      .when('/chat', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/category', {
          templateUrl: 'views/category.html',
          controller: 'CategoryCtrl'
        })
      .whenAuthenticated('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl'
      })
      .when('/locations/:id', {
        templateUrl: 'scripts/feature/detail/detail.html',
        controller: 'LocationDetailController',
        controllerAs: 'ctrl',
          resolve: {
            user: ['Auth', function(Auth) {
              return Auth.$getAuth();
            }]
          }
      })
      .when('/locations/:id/edit', {
        templateUrl: 'scripts/feature/detail/new.html',
        controller: 'NewLocationController',
        controllerAs: 'ctrl',
        resolve: {
            user: ['Auth', function(Auth) {
                return Auth.$getAuth();
            }]
        }
      })
      .when('/new-location', {
        templateUrl: 'scripts/feature/detail/new.html',
        controller: 'NewLocationController',
        controllerAs: 'ctrl'
      })
      .otherwise({redirectTo: '/'});
  }])

  /**
   * Apply some route security. Any route's resolve method can reject the promise with
   * "AUTH_REQUIRED" to force a redirect. This method enforces that and also watches
   * for changes in auth status which might require us to navigate away from a path
   * that we can no longer view.
   */
  .run(['$rootScope', '$location', 'Auth', 'SECURED_ROUTES', 'loginRedirectPath',
    function($rootScope, $location, Auth, SECURED_ROUTES, loginRedirectPath) {
      // watch for login status changes and redirect if appropriate
      Auth.$onAuth(check);

      // some of our routes may reject resolve promises with the special {authRequired: true} error
      // this redirects to the login page whenever that is encountered
      $rootScope.$on('$routeChangeError', function(e, next, prev, err) {
        if( err === 'AUTH_REQUIRED' ) {
          $location.path(loginRedirectPath);
        }
      });

      function check(user) {
        if( !user && authRequired($location.path()) ) {
          $location.path(loginRedirectPath);
        }
      }

      function authRequired(path) {
        return SECURED_ROUTES.hasOwnProperty(path);
      }
    }
  ])

  // used by route security
  .constant('SECURED_ROUTES', {});

(function () {
    "use strict";
    angular.module('accessopolis.navigation', [])
        .service('NavigationService', NavigationService)
        .directive('navigationBar', function() {
            return {
                restrict: 'C',
                scope: true,
                controller: NavigationController,
                templateUrl: 'scripts/feature/navigation/navigation-bar.html',
                controllerAs: 'ctrl'
            }
        })
        .directive('navigationFilter', function() {
            return {
                restrict: 'C',
                scope: true,
                controller: NavigationController,
                templateUrl: 'scripts/feature/navigation/navigation-filter.html',
                controllerAs: 'navFilterCtrl'
            }
        })
        .directive('navigationMenu', function() {
            return {
                restrict: 'C',
                scope: true,
                controller: NavigationController,
                templateUrl: 'scripts/feature/navigation/navigation-menu.html',
                controllerAs: 'ctrlNavMenu'
            }
        });

    function NavigationService($q, Ref, $firebaseArray) {
        this.loadNavigationElements = function () {
            return $q(function (resolve, reject) {
                resolve($firebaseArray(Ref.child('categories')));
            });
        };
    }
    NavigationService.$inject = ["$q", "Ref", "$firebaseArray"];

    NavigationService.prototype.$inject = ['$q', 'Ref', '$firebaseArray'];

    function NavigationController(NavigationService, $rootScope) {
        var self = this;
        NavigationService.loadNavigationElements().then(function(data) {
            self.items = data;
        });
        this.showLocations = function(item, $event, dropMenu) {
            if(dropMenu){
                $(".btn-navbar").click(); //bootstrap 2.x
                $(".navbar-toggle").click() //bootstrap 3.x by Richard
            }

            self.itemExpanded = undefined;
            $rootScope.$broadcast('SubcategorySelected', item);
            $event.stopPropagation();
        };
        this.displaySubMenu = function(item){
            self.itemExpanded = item.$id;
        };

    }
    NavigationController.$inject = ["NavigationService", "$rootScope"];

    NavigationController.prototype.$inject = ['NavigationService', '$rootScope'];


})();

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
    LocationSearchService.$inject = ["$q", "Ref", "$firebaseArray"];

    LocationSearchService.prototype.$inject = ['$q', 'Ref', '$firebaseArray'];

    function LocationSearchController(LocationSearchService, $rootScope, $scope) {

        var self = this;

        $rootScope.$on('SubcategorySelected', function(event, subcategory) {
            self.subcategorySelected = subcategory;
        });

        this.searchParam = undefined;

        this.clearSubcategory = function($event) {
            self.subcategorySelected = undefined;
            $event.stopPropagation();
        };

        this.performSearch = function() {
            LocationSearchService.search({text: self.searchParam, type: self.subcategorySelected}).then(function(result) {
                self.resultList = result;
                if(self.resultList.length>0){
                    self.show_result = true;
                }
            });
        };

        this.showInsertButton = function() {
            return angular.isDefined(self.resultList) && self.resultList.length === 0;
        };

        //we use scope here only to trigger the $watch mechanism. Maybe there would be a better solution?
        //$scope.$watch(function () {
        //    return self.searchParam;
        //},function(){
        //    if(self.searchParam){
        //        self.performSearch();
        //    }
        //});
        //
        //$scope.$watch(function() {
        //    return self.subcategorySelected;
        //}, function() {
        //    if(self.subcategorySelected){
        //      self.performSearch();
        //    }
        //});

    }
    LocationSearchController.$inject = ["LocationSearchService", "$rootScope", "$scope"];

    LocationSearchController.prototype.$inject = ['LocationSearchService', '$rootScope', '$scope'];
})();

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

        this.getUserProfile= function(user){
            if(user){
                return $firebaseObject(Ref.child('users/' + user.uid));;
            }
        }

    }
    LocationDetailService.$inject = ["$q", "$firebaseObject", "Ref", "$firebaseArray"];

    LocationDetailService.prototype.$inject = ['$q', '$firebaseObject', 'Ref', '$firebaseArray', 'imgur', 'IMGUR_API_KEY'];

    function LocationDetailController(LocationDetailService, $routeParams, $location, user, imgur, IMGUR_API_KEY, LocationVideoService, $modal) {

        var self = this;
        self.profile = LocationDetailService.getUserProfile(user);

        imgur.setAPIKey(IMGUR_API_KEY);

        this.imagesType = ['entrance', 'bathroom', 'elevator', 'stairs', 'stairlift', 'room', 'lunchroom', 'other'];

        LocationDetailService.find($routeParams.id).then(function(result) {
            self.detail = result;
            loadVideos(result.$id);
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
            var newRate = {locationId: $routeParams.id, userId: self.profile.$id, rateKind: 'global', rate: self.vote, userType: self.profile.type};

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


        this.addNewImage = function(){
            $modal.open({
                templateUrl: 'scripts/feature/detail/addImage.html',
                controller: ["$scope", "$modal", function($scope, $modal){
                    $scope.ctrl = self;
                    $scope.modal = $modal;
                    $scope.addImage = function(){
                        self.addImage().then(function() {
                            $scope.$close();
                        });

                    }
                }],
                backdrop: 'static'
            });
        };

        this.addNewVideo = function(){
            $modal.open({
                templateUrl: 'scripts/feature/detail/addVideo.html',
                controller: ["$scope", "$modal", function($scope, $modal){
                    $scope.ctrl = self;
                    $scope.modal = $modal;
                    $scope.addImage = function(){
                        self.uploadVideo().then(function() {
                            $scope.$close();
                        });

                    }
                }],
                backdrop: 'static'
            });
        };

        this.openCarousel = function(){
            $modal.open({
                templateUrl: 'scripts/feature/detail/carousel_photos.html',
                controller: ["$scope", "$modal", function($scope, $modal){
                    $scope.ctrl = self;
                    $scope.modal = $modal;
                }],
                backdrop: 'static'
            });
        };



        this.addImage = function() {
          var file = self.imageUpload.file;
          var imageType = self.imageUpload.imageType;
          var description = self.imageUpload.description;
          self.imageUpload = {};
          return imgur.upload(file).then(function(model) {
              var httpsImageUrl = model.link.replace(/^http\:/, "https:");
              var toAdd = {imageUrl: httpsImageUrl};
              if(imageType) {
                  toAdd.imageType = imageType;
                  toAdd.description = description;
              }
              self.images.$add(toAdd).catch(alert);
          });
        }

        function loadImages() {
          LocationDetailService.getComments($routeParams.id).then(function(result) {
              self.comments = result;
          });
        }

        var loadVideos = function(id) {
            LocationVideoService.loadVideos(id).$loaded(function(list) {
                self.videos = list;
                self.locationVideo = _.first(list);
            });
        };
        self.videoUpload = {};
        this.uploadVideo = function(file) {
            LocationVideoService.uploadVideo(file, self.detail).then(function(result) {
                self.videoUpload.file = result;
            });
        };

        self.addVideo = function() {
            LocationVideoService.saveVideo(self.videoUpload.file, self.detail).then(function() {
                loadVideos(self.detail.$id);
            });
        };

        self.showVideo = function(video, $event) {
            self.locationVideo = video;
            $event.preventDefault();
        }


        // IMG
        self.myInterval = 5000;
        self.noWrapSlides = false;



    }
    LocationDetailController.$inject = ["LocationDetailService", "$routeParams", "$location", "user", "imgur", "IMGUR_API_KEY", "LocationVideoService", "$modal"];

    LocationDetailController.prototype.$inject = ['LocationDetailService', '$routeParams', '$location', 'user', 'LocationVideoService', '$modal'];

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
                    $location.path('/locations/' + data.key());
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
    NewLocationController.$inject = ["NavigationService", "LocationDetailService", "$routeParams", "$location", "$rootScope"];

    NewLocationController.prototype.$inject = ['NavigationService', 'LocationDetailService', '$routeParams', '$location', '$rootScope'];

    function LocationVideoController($scope, $sce, LocationVideoService) {
        var self = this;
        $scope.$watch(function() {
            return self.locationVideo;
        }, function(val) {
            if(angular.isDefined(val) && angular.isDefined(val.videoUrl)) {
                self.url = $sce.trustAsResourceUrl(val.videoUrl + '?rel=0');
            }
        });

    }
    LocationVideoController.$inject = ["$scope", "$sce", "LocationVideoService"];

    LocationVideoController.prototype.$inject = ['$scope', 'LocationDetailService', '$sce', 'LocationVideoService'];

    function LocationVideoService(Auth, $log, $firebaseArray, Ref, $q) {

        var self = this;

        this.uploadVideo = function(file, detail) {
            var deferred = $q.defer();
            if(!angular.isDefined(Auth.$getAuth())) {
                deferred.reject({});
            }
            var metadata = {
                snippet: {
                    title: 'Accessopolis review: ' + detail.text,
                    description: window.location.href,
                    tags: ['accessopolis'],
                    categoryId: undefined
                }
            };

            //source: https://github.com/youtube/api-samples/blob/master/javascript/cors_upload.js
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
                        deferred.resolve({videoUrl: 'https://www.youtube.com/embed/'+ actualResponse.id, thumbnail: actualResponse.snippet.thumbnails.default.url});
                    };
                    xhr.onerror = function(err) {
                        $log.error(err);
                        deferred.reject({});
                    };
                    xhr.send(content);
                } else {
                    $log.error(e);
                    deferred.reject({});
                }
            }.bind(this);
            xhr.send(JSON.stringify(metadata));
            return deferred.promise;
        };

        self.saveVideo = function(file, detail) {
            self.loadVideos(detail.$id).$add(file);
        };

        this.loadVideos = function(id) {
            return $firebaseArray(Ref.child('videos/'+id));
        };

    }
    LocationVideoService.$inject = ["Auth", "$log", "$firebaseArray", "Ref", "$q"];

    LocationVideoService.prototype.$inject = ['Auth', '$log', '$firebaseArray', 'Ref', '$q'];

})();

(function() {
    "use strict";
    angular.module('accessopolis.rating', [])
        .service('RatingService', RatingService)
        .directive('accRating', function() {
            return {
                restrict: 'A',
                scope: true,
                controller: RatingController,
                controllerAs: 'ctrlRating',
                bindToController: {
                    rating: '= accRating'
                },
                templateUrl: 'scripts/feature/rating/rating.html'
            }
        });

    function calculateRate(total, list){
        if (!list || list.length == 0){
            return undefined;
        }
        var number = numeral(total);
        return number.divide(list.length).format('0.0');
    }

    function RatingService($q, Ref, $firebaseArray) {
        this.getRating = function(locationObj) {
            var locObj = locationObj;
            return $q(function(resolve, reject) {
                var ratingsByLocation = $firebaseArray(Ref.child('ratings').orderByChild('locationId').equalTo(locObj.$id));
                ratingsByLocation.$loaded(function(data) {
                    var ratingByType = _.groupBy(data, 'userType');

                    var totalStaff = _.sum(ratingByType['expert'], 'rate');
                    var totalPublic = _.sum(ratingByType['public'], 'rate');

                    var ratingByKind = _.groupBy(data, 'rateKind');

                    var totalMobility = _.sum(ratingByKind['mobility'], 'rate');
                    var totalHearing = _.sum(ratingByKind['hearing'], 'rate');
                    var totalVision = _.sum(ratingByKind['vision'], 'rate');
                    var totalMental = _.sum(ratingByKind['mental'], 'rate');

                    resolve({
                        public: calculateRate(totalPublic, ratingByType['public']),
                        staff : calculateRate(totalStaff, ratingByType['expert']),
                        mobility : calculateRate(totalMobility, ratingByKind['mobility']),
                        hearing : calculateRate(totalHearing, ratingByKind['hearing']),
                        vision : calculateRate(totalVision, ratingByKind['vision']),
                        mental : calculateRate(totalMental, ratingByKind['mental'])
                    });
                })
            });
        };
    }
    RatingService.$inject = ["$q", "Ref", "$firebaseArray"];

    RatingService.prototype.$inject = ['$q', 'Ref', '$firebaseArray'];

    function RatingController(RatingService) {

        var self = this;
        RatingService.getRating(self.rating).then(function(rating) {
            self.rate = rating;
        });

    }
    RatingController.$inject = ["RatingService"];

    RatingController.prototype.$inject = ['RatingService'];
})();
