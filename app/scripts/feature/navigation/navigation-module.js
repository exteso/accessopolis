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
        });

    function NavigationService($q, Ref, $firebaseArray) {
        this.loadNavigationElements = function () {
            return $q(function (resolve, reject) {
                resolve($firebaseArray(Ref.child('categories')));
            });
        };
    }

    NavigationService.prototype.$inject = ['$q', 'Ref', '$firebaseArray'];

    function NavigationController(NavigationService, $rootScope) {
        var self = this;
        NavigationService.loadNavigationElements().then(function(data) {
            self.items = data;
        });
        this.showLocations = function(item) {
            $rootScope.$broadcast('SubcategorySelected', item);
        };
    }

    NavigationController.prototype.$inject = ['NavigationService', '$rootScope'];


})();
