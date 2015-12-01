(function() {

  angular.module('accessopolisApp').component('apLocation', {
  
    template: topTemplate() + bodyTemplate(),
    
    controller: ['$routeParams', '$location', 'LocationService', function($routeParams, $location, LocationService) {
      var vm = this;
      
      LocationService.find($routeParams.identifier).then(function(location) {
        vm.location = location;
      });
      
      LocationService.getComments($routeParams.identifier).then(function(comments) {
        vm.comments = comments;
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
  
  function bodyTemplate() {
    return ['<div class="col-xs-12">',
              '<div class="container accessopolis-location-detail-content">',
                '<div class="col-md-12 col-sm-12 col-xs-12 accessopolis-bg-white" style="padding-bottom: 50px; margin-bottom: 20px;  margin-top: 10px;">', //comments
                   '<h1>Commenti:</h1>',
                   '<ul class="list-group col-md-12 col-sm-12 col-xs-12" style="list-style-type: none">',
                    commentTemplate(),
                   '</ul>',
                '</div>',
              '</div>',
            '</div>'].join('');
  }
  
  
  function commentTemplate() {
    return ['<li class="list-group-item" ng-repeat="comment in apLocation.comments track by comment.$id" style="float: left; width: 100%;">',
              '<div style="width: 50px; height: 50px; float: left; ">',
                '<div style="float: left; width: 50px; height: 50px; background: #ccc; color:#fff; text-align: center; border-radius: 50%;  line-height: 50px;">',
                  '<span class="fa fa-user"></span>',
                '</div>',
              '</div>',
              '<div style="float: left; height: 50px; line-height: 50px; margin-left: 10px; " ng-bind="::comment.text"></div>',
            '</li>',
            '<li ng-if="apLocation.comments.length == 0">Nessun commento!</li>'].join('');
  }


})();
