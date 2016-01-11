(function() {
    "use strict";
    
    angular.module('accessopolisApp').directive('autocompleteAddress', function() {
      return {
                restrict: 'A',
                scope: { callback:'&autocompleteAddress' },
                link: function(scope, element, attrs) {
                    var watcher = scope.$watch(function() {
                        return accessopolis.googleMapReady;
                    }, function(val) {
                        if(val) {
                            watcher();//remove watcher                            
                            var autocomplete = new google.maps.places.Autocomplete(element[0], {types: ['geocode']});
                            autocomplete.addListener('place_changed', function() {
                              var place = autocomplete.getPlace();
                              if (place.geometry) {
                      					scope.$evalAsync(function() {scope.callback()(place);});
                              }
                            });
                        }
                    });
                }
            }
    });
    
})();
