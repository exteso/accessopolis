(function() {

  angular.module('accessopolisApp').component('apNewLocation', {

    templateUrl: 'scripts2/components/new-location/new-location.html',
    controller: ['$location', 'LocationService', 'Auth', function($location, LocationService, Auth) {
      var vm = this;

      Auth.$onAuth(function(authData) {
        vm.isAuth = !!authData;
      });

      LocationService.loadNavigationElements().then(function(subtypes){
        vm.subtypes = subtypes;
      });

      LocationService.find(this.identifier).then(function(location) {
        vm.location = location;
      });

    function save(frm) {
        if(!frm.$valid) {
            return;
        }
        if (vm.location.$id){
            LocationService.update(vm.location)
            $location.path('/location/' + vm.location.$id);
        } else {
            LocationService.create(vm.location).then(function (data) {
                $location.path('/location/' + data.key());
            }, function (err) {
                alert(err);
            })
        };
    };

      function currentUser(){
          Auth;
          return "yanke";
      }

      function backToHome() {
        $location.path('/');
      }

      this.backToHome = backToHome;
      this.save = save;
      this.currentUser = currentUser;
    }]
  })

})();
