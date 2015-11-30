(function() {

  angular.module('accessopolisApp').component('apLoginStatus', {
    controller: ['Auth', 'Ref', '$firebaseObject', function(Auth, Ref, $firebaseObject) {
    
      var vm = this;
    
      Auth.$onAuth(function(authData) {
        if(authData) {
          vm.user = Auth.$getAuth();
          vm.profile = $firebaseObject(Ref.child('users/' + vm.user.uid));
        } else {
          vm.user = undefined;
          vm.profile = undefined;
        }
      });
    
    
      function redirect() {
        //TODO: complete
      }
      
      function showError() {
        //TODO: complete
      }
      
      function logout() {
        Auth.$unauth();
      }
    
    
      function oauthLogin() {
        Auth.$authWithOAuthPopup('google', { scope: 'email https://www.googleapis.com/auth/youtube.upload' }).then(redirect, showError);
      }
      
      
      //
      this.oauthLogin = oauthLogin;
      this.logout = logout;
    }],
    template: ['<div ng-if="!apLoginStatus.user">',
                 '<button class="btn btn-primary hidden-xs btn-lg pull-right navbar-btn" ng-click="apLoginStatus.oauthLogin()">Accedi con Google</button>',
                 '<button class="btn btn-primary visible-xs btn-sm pull-right navbar-btn" ng-click="apLoginStatus.oauthLogin()">Accedi</button>',
               '</div>',
               '<div ng-if="apLoginStatus.user" class="accessopolis-profile">',
                 '<button role="button" ng-click="apLoginStatus.logout()" class="btn btn-danger navbar-btn pull-right hidden-xs">Log Out</button>',
                 '<button role="button" ng-click="apLoginStatus.logout()" class="btn btn-danger btn-sm navbar-btn pull-right visible-xs">Log Out</button>',
                 '<div class="accessopolis-profile-icon hidden-xs" style="background-image: url(\'{{apLoginStatus.user.google.cachedUserProfile.picture}}\')"></div>',
                 '<div class="accessopolis-profile-name hidden-xs">',
                   '<a ng-href="{{apLoginStatus.user.google.cachedUserProfile.link}}" target="_blank" ng-bind="apLoginStatus.user.google.cachedUserProfile.name"></a>',
                 '</div>',
               '</div>',
              ].join('')
  });

})();
