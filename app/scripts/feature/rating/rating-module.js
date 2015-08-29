(function() {
    "use strict";
    angular.module('accessopolis.rating', [])
        .service('RatingService', RatingService)
        .directive('rating', function() {
            return {
                restrict: 'A',
                scope: true,
                controller: RatingController,
                controllerAs: 'ctrlRating',
                bindToController: {
                    rating: '='
                },
                templateUrl: 'scripts/feature/rating/rating.html'
            }
        });

    function RatingService($q, Ref, $firebaseArray) {
        this.getRating = function(locationObj) {
            var locObj = locationObj;
            return $q(function(resolve, reject) {
                var ratingsByLocation = $firebaseArray(Ref.child('ratings').orderByChild('locationId').equalTo(locObj.$id));
                ratingsByLocation.$loaded(function(data) {
                    var total = _.sum(data, 'rate');
                    resolve({public: total/data.length, staff : 0});
                })
            });
        };
    }

    RatingService.prototype.$inject = ['$q', 'Ref', '$firebaseArray'];

    function RatingController(RatingService) {

        var self = this;

        RatingService.getRating(self.rating).then(function(rating) {
            self.publicRating = rating.public;
            self.staffRating = rating.staff;
        });

    }

    RatingController.prototype.$inject = ['RatingService'];
})();
