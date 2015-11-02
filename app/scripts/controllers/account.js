'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('accessopolisApp')
  .service('UserService', UserService)
  .controller('AccountCtrl', function ($scope, user, Auth, Ref, $firebaseObject, $timeout, $location) {
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
            if (!$scope.profile.isAdmin){
                $scope.profile.isAdmin = 'false'; //if a user is not yet defined as Admin, we force it to have a property isAdmin == false
            }
        }
      });
  });


function UserService($q, $firebaseObject, Ref, user) {

    this.getCurrentUserProfile= function(){
        if(user){
            return $firebaseObject(Ref.child('users/' + user.uid));
        }
    }

}

UserService.prototype.$inject = ['$q', '$firebaseObject', 'Ref', 'user'];

