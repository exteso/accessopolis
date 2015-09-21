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

    NavigationController.prototype.$inject = ['NavigationService', '$rootScope'];


})();
