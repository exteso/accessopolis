Ionic + Firebase Seed App
=========================

![Logo](/www/img/starter-logo.png)

This is a seed application to help you get started building apps with [Ionic](http://ionicframework.com/) and Firebase. Using [AngularFire](https://www.firebase.com/docs/web/libraries/angular/), this app implements email & password authentication and adds messages to a synchronized array. The app is built using the [Ionic CLI](http://ionicframework.com/docs/cli/).

## [Getting Started](https://www.firebase.com/docs/web/libraries/ionic/guide.html)

First, replace `FBURL` with the URL of your own Firebase on line 4 in `/www/js/app.js`. To run this app you need to install the Ionic CLI. Run the following commands to get started:

```
npm install -g ionic
git clone git@github.com:sararob/ionic-seed.git
cd ionic-seed/
ionic serve
```

To see a side by side iOS and Android view of your app in the browser, run `ionic serve --lab` instead of `ionic serve`. Details on `ionic serve` can be found in the [Ionic docs](http://ionicframework.com/docs/cli/test.html).


## Running your app

You can run this app in the browser using the command `ionic serve`, or use `ionic serve --lab` to run it in the browser with a side by side iOS and Android view.

To configure your app for iOS or Android and run it in the emulator, follow the instructions in our [Ionic guide](https://www.firebase.com/docs/web/libraries/ionic/guide.html).

## How it Works

Since Ionic is built on top of Angular, this seed application uses AngularFire.

#### Email & password authentication

This app makes use of Firebase's [email & password authentication](https://www.firebase.com/docs/web/guide/login/password.html). To enable email & password auth, navigate to the "Login & Auth" tab in your Firebase app dashboard and select "Enable Email & Password Authentication".

Once it's enabled, you're ready to start creating and authenticating users in your app. You can create users with AngularFire's [`$createUser()`](https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-users-and-authentication-createusercredentials) method, passing it an email and password. Then you'll use `$authWithPassword()` to log users in, and `$unauth()` to log users out. This app also makes use of `$onAuth` to check the user's authentication state and set `$scope.loggedInUser` to the current user.

Firebase also supports authentication with Facebook, Twitter, GitHub, Google, anonymous auth, and custom authentication. Check out the docs on user authentication for details on these authentication methods.

#### Adding messages to a synchronized array

This app uses the [`$firebaseArray`](https://www.firebase.com/docs/web/libraries/angular/guide/synchronized-arrays.html) service to store message data in a synchronized array. Using `$firebaseArray`, our local Angular array is kept in sync with our remote Firebase data. To add items to `$firebaseArray`, use the $add() method. Check out the [AngularFire documentation](https://www.firebase.com/docs/web/libraries/angular/guide/synchronized-arrays.html) for more details on how this works.

## Testing your app

### Unit tests

Unit tests can be found in `tests/Services/services.tests.js`. To run them, navigate to the `tests/` directory and run the command `karma start`. The tests check that both the `Auth` and `Messages` factories return `$firebaseAuth` and `$firebaseArray` respectively.

### End-to-end tests

End-to-end tests can be found in `e2e-tests/scenarios.js`. To run them, navigate to the `e2e/` directory and run the command `protractor protractor.conf.js`. The e2e tests check that the app loads correctly, logs users in, displays the messages list to logged in users, and adds a message to Firebase when the "Add" button is pressed.

## Securing your app

This seed app has two basic security rules. The first ensures that only logged in users can add messages to the list:

` ".write": "auth != null"`

The second rule ensures that new messages are not empty:

`".validate": "newData.hasChild('text')"`

`.validate` rules are run after `.write` rules succeed. You can see the full rules in the `rules.json` file. If you're using Firebase Hosting to deploy your application, you can deploy your security rules file to Firebase by adding a `rules` parameter to your `firebase.json` file. Check out the [hosting documentation](https://www.firebase.com/docs/hosting/guide/full-config.html#section-advanced-properties) for details on configuring this.

For more details on security rules, check out the [security quickstart](https://www.firebase.com/docs/security/quickstart.html) in our documentation.

## Deploying your app

To publish your app in the iOS or Android app stores, follow the instructions in the [Ionic documentation](http://ionicframework.com/docs/guide/publishing.html).

You can use [Firebase Hosting](https://www.firebase.com/docs/hosting/) to deploy your app on the web in three steps:

#### 1. Install the Firebase command line tools

To install firebase-tools, run the command:

`npm install -g firebase-tools`

#### 2. Initialize your app

`cd` into your app directory and run the command:

`firebase init`

Then you'll be prompted to enter the name of the Firebase app you'd like to deploy. After selecting your app, enter `www/` as the current directory. This will tell Firebase Hosting to deploy your `www/` directory (which is where your `index.html` file lives) every time you deploy your app. You only ever need to run this init command once.

#### 3. Deploy your app

To deploy your app simply run:

`firebase deploy`

Your app will be deployed to `YOUR-APP-NAME.firebaseapp.com`. Custom domains are available for paid plans, and details on setting up custom domains can be found [here](https://www.firebase.com/docs/hosting/guide/custom-domain.html).

## File Structure

This app follows the structure of the blank starter template generated through the Ionic CLI. Here's an explanation of each directory:

* `e2e-tests`: All of the end to end tests for our application, written using Protractor
* `hooks`: Place any scripts for customizing cordova commands within this directory. We haven't added anything to this directory other than what came with the Ionic starter template. `hooks` are typically only used in larger projects.
* `scss`: Using SASS is optional in Ionic apps, but you can customize and change default SCSS style in this directory.
* `tests`: All of the unit tests for our application, written using Karma.
* `www`: The bulk of the code for our application. All of the HTML for our app is in `index.html`. The JavaScript is in `www/js/app.js`. The CSS we've added is in `www/css/style.css` and images are in the `www/img/` directory.

## Contributing

We'd love to accept your sample apps and patches! Before we can take them, we a few business items to take care of including our CLA and an overview of our contribution process.

### Contributor License Agreements

Please fill out either the individual or corporate Contributor License Agreement
(CLA).

  * If you are an individual writing original source code and you're sure you
    own the intellectual property, then you'll need to sign an [individual CLA]
    (https://developers.google.com/open-source/cla/individual).
  * If you work for a company that wants to allow you to contribute your work,
    then you'll need to sign a [corporate CLA]
    (https://developers.google.com/open-source/cla/corporate).

Follow either of the two links above to access the appropriate CLA and
instructions for how to sign and return it. Once we receive it, we'll be able to
accept your pull requests.

### Contribution Process

1. Submit an issue describing your proposed change to the repo in question.
1. The repo owner will respond to your issue promptly.
1. If your proposed change is accepted, and you haven't already done so, sign a
   Contributor License Agreement (see details above).
1. Fork the desired repo, develop and test your code changes.
1. Ensure that your code adheres to the existing style of the library to which
   you are contributing.
1. Ensure that your code has an appropriate set of unit tests which all pass.
1. Submit a pull request.
