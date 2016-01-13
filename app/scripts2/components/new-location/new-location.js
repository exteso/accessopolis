(function() {

  angular.module('accessopolisApp').component('apNewLocation', {

    templateUrl: 'scripts2/components/new-location/new-location.html',
    bindings: {
      identifier:'=',
    },
    controller: ['$location', 'LocationService', 'Auth', function($location, LocationService, Auth) {
      var vm = this;

      Auth.$onAuth(function(authData) {
        vm.isAuth = !!authData;
      });

      if (this.identifier) {
          LocationService.find(this.identifier).then(function (location) {
              vm.location = location;
          });
      }

      LocationService.loadNavigationElements().then(function(subtypes){
        vm.subtypes = subtypes;
      });

      function save(frm) {
        if(!frm.$valid) {
            return;
        }

        LocationService
          .create(vm.location)
          .then(function (data) {$location.path('/location/' + data.key());}, function (err) {alert(err);})
      };

      function onAddressSelected(address) {
        vm.location = vm.location || {};
        vm.location.address = address.formatted_address;
        vm.location.lat = address.geometry.location.lat();
        vm.location.long = address.geometry.location.lng();
      };


      function backToHome() {
        $location.path('/');
      }

      this.backToHome = backToHome;
      this.save = save;
      this.onAddressSelected = onAddressSelected;

    }]
  })

})();
