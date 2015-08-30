'use strict';

/**
 * @ngdoc overview
 * @name accessopolisApp
 * @description
 * # accessopolisApp
 *
 * Main module of the application.
 */
angular.module('accessopolisApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.ref',
    'firebase.auth',
    'accessopolis.navigation',
    'accessopolis.search',
    'accessopolis.locationDetail',
    'accessopolis.rating',
    'pascalprecht.translate'
  ])
    .config(function ($translateProvider) {
        $translateProvider.translations('en', {
            'accessopolis.rating.expert': 'Experts',
            'accessopolis.rating.public': 'Public'
        });
        $translateProvider.translations('it', {
            'accessopolis.rating.expert': 'Esperti',
            'accessopolis.rating.public': 'Pubblico'
        });
        $translateProvider.preferredLanguage('it');
    })
    .controller('AppCtrl', function ($scope, Auth) {
        $scope.user = Auth.$getAuth();
    });
