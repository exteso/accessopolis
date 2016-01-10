(function() {

angular.module('accessopolisApp').service('UserService', ['Auth', '$q', '$firebaseObject', 'Ref', '$firebaseArray', UserService]);

function UserService(Auth, $q, $firebaseObject, Ref, $firebaseArray) {

    var user;
    var profile;

    Auth.$onAuth(function (authData) {
        if (authData) {
            user = Auth.$getAuth();
            find(user.uid).then(function(profileFromDB){
                profile = profileFromDB;
            })
        } else {
            user = undefined;
            profile = undefined;
        }
    });

    function getUser() {
        return user;
    }

    function getProfile() {
        return profile;
    }

    function find(id) {
        return $q(function (resolve, reject) {
            $firebaseObject(Ref.child('users/' + id)).$loaded(function (val) {
                resolve(val);
            });
        });
    };

    //
    this.find = find;
    this.getUser = getUser;
    this.getProfile = getProfile;
}
})();




