(function() {

  angular.module('accessopolisApp').component('apLocation', {
    template:topTemplate(),
    controller: ['$routeParams', '$location', 'LocationService', function($routeParams, $location, LocationService) {
      var vm = this;
      
      LocationService.find($routeParams.identifier).then(function(location) {
        vm.location = location;
      });
      
      function backToHome() {
        $location.path('/');
      }
      
      
      this.backToHome = backToHome;
    }]
  })

  function topTemplate() {

    return [
    '<div class="accessopolis-location-detail col-xs-12" style="background: #000 !important;">',
        '<div class="container accessopolis-location-detail-header-wrap">',
            '<div class="accessopolis-location-detail-back col-md-12 col-sm-12 col-xs-12">',
                '<button type="button" data-ng-click="apLocation.backToHome()" class="btn btn-primary btn-xs">',
                    '<span class="fa fa-chevron-left"></span> <span>Torna alla lista</span>',
                '</button>',
            '</div>',
            '<div class="accessopolis-location-detail-header col-md-12 col-sm-12 col-xs-12">',
                '<div class="accessopolis-location-detail-header-title col-md-8 col-sm-8 col-xs-8">',
                    '<h1>{{apLocation.location.text}}</h1>',
                    '<div>{{apLocation.location.address}}</div>',
                '</div>',
            '</div>',
      '</div>',
    '</div>'
    ].join('');
  }


})();
