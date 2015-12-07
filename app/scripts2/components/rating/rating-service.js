(function() {

angular.module('accessopolisApp').service('RatingService', ['$q', 'Ref', '$firebaseArray', RatingService]);

  function RatingService($q, Ref, $firebaseArray) {


    function calculateRate(total, list){
      if (!list || list.length == 0){
        return undefined;
      }
      return (total / list.length).toFixed(1).toString();
    }


    function getRating(locationId) {
      return $q(function(resolve, reject) {
        $firebaseArray(Ref.child('ratings').orderByChild('locationId').equalTo(locationId)).$loaded(function(res) {
          resolve(res);
        });
      }).then(function(ratings) {
        var ratingByType = _.groupBy(ratings, 'userType');
        var totalStaff = _.sum(ratingByType['expert'], 'rate');
        var totalPublic = _.sum(ratingByType['public'], 'rate');
        
        return {
          public: calculateRate(totalPublic, ratingByType['public']),
          staff: calculateRate(totalStaff, ratingByType['expert'])
        };
      });
    }
    
    //
    this.getRating = getRating;

  }


})();
