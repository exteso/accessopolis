(function() {

angular.module('accessopolisApp').service('UserService', ['$q', '$firebaseObject', 'Ref', '$firebaseArray', UserService]);


function UserService($q, $firebaseObject, Ref, $firebaseArray) {

  function find(id) {
        return $q(function(resolve, reject) {
            $firebaseObject(Ref.child('users/'+id)).$loaded(function(val) {
                resolve(val);
            });
        });
    };
    
    //
    this.find = find;
}

})();




