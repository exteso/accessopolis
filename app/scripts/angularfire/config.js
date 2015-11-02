angular.module('firebase.config', [])
  .constant('FBURL', 'https://accessopolis-dev.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['google'])

  .constant('loginRedirectPath', '/login');
