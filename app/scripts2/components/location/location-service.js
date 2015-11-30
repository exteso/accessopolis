(function() {


  angular.module('accessopolisApp').service('LocationService', ['$q', '$firebaseObject', 'Ref', '$firebaseArray', LocationService]);


  function LocationService($q, $firebaseObject, Ref, $firebaseArray) {
    this.find = function(id) {
        return $q(function(resolve, reject) {
            var obj = $firebaseObject(Ref.child('locations/'+id));
            obj.$loaded(function(val) {
                resolve(val);
            });
        });
    };

    this.getComments = function(id) {
        return $q(function(resolve, reject) {
            var obj = $firebaseArray(Ref.child('comments/'+id));
            obj.$loaded(function(val) {
                resolve(val);
            });
        });
    };

    this.getImages = function(id) {
        return $q(function(resolve, reject) {
          var obj = $firebaseArray(Ref.child('images/'+id));
          obj.$loaded(function(val) {
            resolve(val);
          });
        });
    };

    this.update = function(location){
        if (location.$id){
            var obj = $firebaseObject(Ref.child('locations/'+location.$id));

            obj.$loaded().then(function() {
                angular.extend(obj, location);
                return obj.$save();
            });
            return obj;
        }
    };

    this.create = function(location) {
        return $firebaseArray(Ref.child('locations')).$add(location);
    };

    this.rate = function(newRate){
        return $firebaseArray(Ref.child('ratings')).$add(newRate);
    };
  }

    
})();
