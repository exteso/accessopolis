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

    function calculateRate(total, list){
        if (!list || list.length == 0){
            return undefined;
        }
        var number = numeral(total);
        var calc = number.divide(list.length).format('0.0');
        return calc
    };

    function RatingService($q, Ref, $firebaseArray) {
        this.getRating = function(locationObj) {
            var locObj = locationObj;
            return $q(function(resolve, reject) {
                var ratingsByLocation = $firebaseArray(Ref.child('ratings').orderByChild('locationId').equalTo(locObj.$id));
                ratingsByLocation.$loaded(function(data) {
                    var ratingByType = _.groupBy(data, 'userType');

                    var totalStaff = _.sum(ratingByType['staff'], 'rate');
                    var totalPublic = _.sum(ratingByType['public'], 'rate');

                    var ratingByKind = _.groupBy(data, 'rateKind');

                    var totalMobility = _.sum(ratingByKind['mobility'], 'rate');
                    var totalHearing = _.sum(ratingByKind['hearing'], 'rate');
                    var totalVision = _.sum(ratingByKind['vision'], 'rate');
                    var totalMental = _.sum(ratingByKind['mental'], 'rate');

                    //TODO switch to use numeral.js
                    resolve({
                        public: calculateRate(totalPublic, ratingByType['public']),
                        staff : calculateRate(totalStaff, ratingByType['staff']),
                        mobility : calculateRate(totalMobility, ratingByKind['mobility']),
                        hearing : calculateRate(totalHearing, ratingByKind['hearing']),
                        vision : calculateRate(totalVision, ratingByKind['vision']),
                        mental : calculateRate(totalMental, ratingByKind['mental'])
                    });
                })
            });
        };
    }

    RatingService.prototype.$inject = ['$q', 'Ref', '$firebaseArray'];

    function RatingController(RatingService) {

        var self = this;

        RatingService.getRating(self.rating).then(function(rating) {
            self.rate = rating;
        });

    }

    RatingController.prototype.$inject = ['RatingService'];
})();
