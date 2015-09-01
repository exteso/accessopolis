'use strict';
/**
 * @ngdoc function
 * @name accessopolisApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('accessopolisApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {

        $scope.oauthLogin = function(provider, dropMenu) {

            if(dropMenu){
                $(".btn-navbar").click(); //bootstrap 2.x
                $(".navbar-toggle").click() //bootstrap 3.x by Richard
            }

          $scope.err = null;
          Auth.$authWithOAuthPopup(provider, { scope: 'email' }).then(redirect, showError);

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


  });
