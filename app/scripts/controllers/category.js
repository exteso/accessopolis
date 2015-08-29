'use strict';
/**
 * @ngdoc function
 * @name accessopolisApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * A CRUD tool for managing Categories using AngularFire to manage a synchronized list.
 */
angular.module('accessopolisApp')
  .controller('CategoryCtrl', function ($scope, Ref, $firebaseArray, $timeout) {
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

        var indexRef = Ref.child('categories/-Jxq25S1MFuBM7l_lJlM');

        // synchronize a read-only, synchronized array of messages, limit to most recent 10
        $scope.categories = $firebaseArray(Ref.child('categories').limitToLast(10));

        // display any errors
        $scope.categories.$loaded().catch(alert);

        var selectedCat = $scope.categories.$getRecord(category.$id);

        var selectedCat1 = $firebaseObject(selectedCat);
        //$scope.selectedCat = Ref.child('categories').$getRecord(category.$id);
        // push a subcategory to the end of the array
        var selectedCatSubCategories = $firebaseArray(selectedCat.subcategory);
        selectedCatSubCategories.$add({text: newSubcategory})
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
  });
