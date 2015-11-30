(function() {

  angular.module('accessopolisApp')
    .service('SearchBoxService', ['$q', 'Ref', '$firebaseArray', SearchBoxService]);
  
  
  function SearchBoxService($q, Ref, $firebaseArray) {
    function search(criterion) {
      return $q(function(resolve, reject) {
        var list = $firebaseArray(Ref.child('locations'));
        list.$loaded(function(data) {
          var filteredResults = _.chain(data).filter(function(e) {
            if(angular.isDefined(criterion.type)) {
              return e.type === criterion.type;
            }
            return true;
          })
          .filter(function(e) {
            if(angular.isDefined(criterion.text)) {
                var split = criterion.text.split(/[\s,]/);
                var minimumScore = Math.max(1, split.length -1);
                return _.filter(split, function(w) {
                        return e.text.toLowerCase().indexOf(w.toLowerCase()) > -1;
                    }).length >= minimumScore;
            }
            return true;
          }).value();
          
          resolve(filteredResults);
          
        }, reject);
        });
    };
  
  
    this.search = search;
  }
  
  
})();
