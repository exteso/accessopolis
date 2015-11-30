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
