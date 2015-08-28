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

    function NavigationService($q) {
        this.loadNavigationElements = function () {
            return $q(function (resolve, reject) {
                resolve([{
                        key: 'navigation.public-transport',
                        children: [
                            'airports',
                            'train-stations',
                            'bus',
                            'taxis',
                            'ships'
                        ]
                    }, {
                        key: 'navigation.holidays',
                        children: [
                            'hotels',
                            'hostels',
                            'farmhouse',
                            'camping'
                        ]
                    }, {
                        key: 'food',
                        children: [
                            'restaurant',
                            'bar',
                            'pub'
                        ]
                    }, {
                        key: 'religion',
                        children: [
                            'church',
                            'mosque',
                            'synagogue'
                        ]
                }]);
            });
        };
    }

    NavigationService.prototype.$inject = ['$q'];

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
