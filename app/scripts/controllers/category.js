'use strict';
/**
 * @ngdoc function
 * @name accessopolisApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * A CRUD tool for managing Categories using AngularFire to manage a synchronized list.
 */
angular.module('accessopolisApp')
  .controller('CategoryCtrl', function ($scope, Ref, $firebaseArray, $firebaseObject, $timeout) {
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
  });
