(function() {

  angular.module('accessopolisApp').component('apNewLocation', {

    templateUrl: 'scripts2/components/location/new-location.html',
    bindings: {
      //identifier:'=',
    },

    controller: ['$location', 'LocationService', 'Auth', function($location, LocationService, Auth) {
      var vm = this;

      Auth.$onAuth(function(authData) {
        vm.isAuth = !!authData;
      });

      LocationService.loadNavigationElements().then(function(subtypes){
        vm.subtypes = subtypes;
      });

      function save(frm) {
            if(!frm.$valid) {
                return;
            }
            if (vm.location.$id){
                LocationService.update(vm.location)
                $location.path('/location/' + vm.location.$id);
            }else {
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
