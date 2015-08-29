angular.module('ionic-firebase-seed', ['ionic', 'firebase', 'starter.controllers'])

// TODO: Replace this with your own Firebase URL: https://firebase.com/signup
.constant('FBURL', 'https://accessopolis.firebaseio.com/')

.factory('Auth', function($firebaseAuth, FBURL, $window) {
  var ref = new $window.Firebase(FBURL);
  return $firebaseAuth(ref);
})

.factory('Messages', function($firebaseArray, FBURL, $window) {
  var ref = new $window.Firebase(FBURL + '/messages');
  return $firebaseArray(ref);
})

.controller('AppCtrl', function($scope, Auth, Messages) {

  // EMAIL & PASSWORD AUTHENTICATION

  // Check for the user's authentication state
  Auth.$onAuth(function(authData) {
    if (authData) {
      $scope.loggedInUser = authData;
    } else {
      $scope.loggedInUser = null;
    }
  });

  // Create a new user, called when a user submits the signup form
  $scope.createUser = function(user) {
    Auth.$createUser({
      email: user.email,
      password: user.pass
    }).then(function() {
      // User created successfully, log them in
      return Auth.$authWithPassword({
        email: user.email,
        password: user.pass
      });
    }).then(function(authData) {
      console.log('Logged in successfully as: ', authData.uid);
      $scope.loggedInUser = authData;
    }).catch(function(error) {
      console.log('Error: ', error);
    });
  };
      $scope.login = function() {
        $scope.err = null;
        Auth.$authWithOAuthPopup('google', { scope: 'email' }).then(function(authData) {
          console.log('Logged in successfully as: ', authData.uid);
          $scope.loggedInUser = authData;
        }).catch(function(error) {
          console.log('Error: ', error);
        });

      };

  // Login an existing user, called when a user submits the login form
  $scope.oldlogin = function(user) {
    Auth.$authWithPassword({
      email: user.email,
      password: user.pass
    }).then(function(authData) {
      console.log('Logged in successfully as: ', authData.uid);
      $scope.loggedInUser = authData;
    }).catch(function(error) {
      console.log('Error: ', error);
    });
  };

  // Log a user out
  $scope.logout = function() {
    Auth.$unauth();
  };

  // ADD MESSAGES TO A SYNCHRONIZED ARRAY

  // Bind messages to the scope
  $scope.messages = Messages;

  // Add a message to a synchronized array using $add with $firebaseArray
  $scope.addMessage = function(message) {
    if ($scope.loggedInUser) {
      Messages.$add({
        email: $scope.loggedInUser.password.email,
        text: message.text
      });
      message.text = "";
    }
  };

})

.run(function($ionicPlatform, FBURL) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (FBURL === "https://YOUR-FIREABASE-APP.firebaseio.com/") {
      angular.element(document.getElementById('app-content')).html('<h1>Please configure your Firebase URL in www/js/app.js before running!</h1>');
    }
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});