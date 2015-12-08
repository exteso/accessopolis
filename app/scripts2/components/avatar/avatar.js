(function() {

  angular.module('accessopolisApp').component('apAvatar', {
    bindings: {
      'userId': '='
    },
    
    template: '<span ng-if="apAvatar.user === undefined"><span class="fa fa-user"></span></span>'+
        '<span ng-if="apAvatar.user" title="{{apAvatar.user.name}}" style="'+
          'display: block;'+
          'height: 50px;'+
          'width: 50px;'+
          'background-size: cover;" ng-style="{\'background-image\': \'url({{apAvatar.user.imageURL}})\'}"></span>',
    
    controller: ['UserService', function(UserService) {
      var vm = this;
      UserService.find(this.userId).then(function(user) {
        vm.user = user;
      });
    }]
    
  });
})();
