(function() {
'use strict';


angular.module('accessopolisApp', ['ngRoute', 'firebase'])
  .constant('IMGUR_API_KEY', 'Client-ID 7a37861e931f779')
  .constant('GOOGLE_API_KEY', 'AIzaSyCbm7ot6UqPk9I7sQVu3Z3PeU7hvwT0pbU')
  //firebase related conf
  .constant('FBURL', 'https://accessopolis-dev.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['google'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<ap-search-box></ap-search-box>'
      }).
      when('/add-new-location', {
        template: '<ap-add-new-location></ap-add-new-location>'
      }).
      when('/location/:identifier', {
        template: '<ap-location identifier="identifier"></ap-location>',
        controller: ['$routeParams', '$scope', function($routeParams, $scope) {
          $scope.identifier = $routeParams.identifier;
        }]
      })
      .when('/location/:identifier/edit',{
          template: '<ap-new-location identifier="identifier"></ap-new-location>',
          controller: ['$routeParams', '$scope', function($routeParams, $scope) {
              $scope.identifier = $routeParams.identifier;
          }]
      })
      .when('/location/:identifier/media', {
        template: '<ap-location-media identifier="identifier"></ap-location-media>',
        controller: ['$routeParams', '$scope', function($routeParams, $scope) {
          $scope.identifier = $routeParams.identifier;
        }]
      })
      .when('/new-location', {
        template: '<ap-new-location></ap-new-location>',
        controller: ['$routeParams', '$scope', function($routeParams, $scope) {
            $scope.text = '';
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
