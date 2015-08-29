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
    'accessopolis.rating'
  ]);
