exports.config = {
          capabilities: {
                  // You can use other browsers
                  // like firefox, phantoms, safari, IE
                  'browserName': 'chrome'
          },
          framework: 'jasmine2', // The testing framework we're using
          specs: ['scenarios.js'], // The file containing our tests
          files: [ // The dependencies in our app
            '../www/lib/angular/angular.js',
            '../www/lib/firebase/firebase.js',
            '../www/lib/ionic/js/ionic.bundle.js',
            '../www/lib/angular-mocks/angular-mocks.js',
            '../www/lib/angularfire/dist/angularfire.js',
            '../www/js/*.js',
            'e2e-tests/*.js'
          ],
          baseUrl: 'http://localhost:8100', // The url where our app is running locally
          onPrepare: function() { // This function is run before any of our tests
            browser.driver.get('https://localhost:8100');
          }

};