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
    'pascalprecht.translate',
    'ngImgur'
  ])
    .constant('IMGUR_API_KEY', 'Client-ID 7a37861e931f779')
    .config(function ($translateProvider) {
        $translateProvider.translations('en', {
            'public-transport': 'Public Transports',
            'airports': 'Airports',
            'train-stations': 'Train Stations',
            'bus': 'Buses',
            'taxis': 'Taxis',
            'ships': 'Ships',
            'holidays': 'Holidays',
            'hotels':'Hotels',
            'hostels':'Hostels',
            'farmhouse':'Farmhouses',
            'camping':'Campings',
            'food':'Food',
            'restaurant':'Restaurants',
            'bar':'Bar',
            'pub':'Pubs',
            'religion': 'Religion',
            'mosque': 'Mosques',
            'church': 'Churches',
            'synagogue': 'Temples',
            'sport': 'Sport',
            'culture': 'Culture and freetime',
            'accessopolis.rating.expert': 'Experts',
            'accessopolis.rating.public': 'Public',
            'accessopolis.accessibility-evaluation': 'Accessibility Evaluation',
            'accessopolis.accessibility-evaluation-mobility': 'Mobility',
            'accessopolis.accessibility-evaluation-hearing': 'Hearing',
            'accessopolis.accessibility-evaluation-vision': 'Vision',
            'accessopolis.accessibility-evaluation-mental': 'Mental',
            'accessopolis.insert-new-location': 'Insert new location',
            'accessopolis.edit-location': 'Edit',
            'accessopolis.location.description': 'Location Description',
            'accessopolis.error.minlength': 'The value inserted is not valid',
            'accessopolis.error.maxlength': 'The value inserted is not valid',
            'accessopolis.error.required': 'This field is required',
            'accessopolis.location.type': 'Location Type',
            'accessopolis.location.address': 'Location Address',
            'accessopolis.cancel': 'Cancel',
            'accessopolis.save': 'Save',
            'accessopolis.selected.categories': 'Selected Categories',
            'accessopolis.location.not-found': 'No locations found',
            'accessopolis.location.new': 'Add Location',
            'report-a-problem': 'Report a problem',
            'accessopolis.back-to-list': 'Back to list',
            'accessopolis.vote.now' : 'Leave your vote',
            'accessopolis.voting': 'Vote!',
            'accessopolis.welcome': 'welcome to Accessopolis.ch',
            'accessopolis.back-to-home': 'Back to home',
            'accessopolis.exit' : 'Logout',
            'accessopolis.sign-in' : 'Login',
            'accessopolis.comment': 'Comment'
        });
        $translateProvider.translations('it', {
            'public-transport': 'Trasporti Pubblici',
            'airports': 'Aeroporti',
            'train-stations': 'Stazioni Ferroviarie',
            'bus': 'Autobus',
            'taxis': 'Taxi',
            'ships': 'Imbarcazioni',
            'holidays': 'Vacanze',
            'hotels':'Hotel',
            'hostels':'Ostelli',
            'farmhouse':'Colonie',
            'camping':'Campeggi',
            'food':'Cibo',
            'restaurant':'Ristoranti',
            'bar':'Bar',
            'pub':'Pubs',
            'religion': 'Luoghi di Culto',
            'mosque': 'Moschee',
            'church': 'Chiese',
            'synagogue': 'Sinagoghe',
            'sport': 'Sport',
            'culture': 'Cultura e tempo libero',
            'accessopolis.rating.expert': 'Esperti',
            'accessopolis.rating.public': 'Pubblico',
            'accessopolis.accessibility-evaluation': 'Valutazione Accessibilità',
            'accessopolis.accessibility-evaluation-mobility': 'Fisiche',
            'accessopolis.accessibility-evaluation-hearing': 'Uditive',
            'accessopolis.accessibility-evaluation-vision': 'Visive',
            'accessopolis.accessibility-evaluation-mental': 'Mentali',
            'accessopolis.insert-new-location': 'Inserire una nuova struttura',
            'accessopolis.edit-location': 'Modifica',
            'accessopolis.location.description': 'Descrizione della struttura',
            'accessopolis.error.minlength': 'Il valore inserito non è valido',
            'accessopolis.error.maxlength': 'Il valore inserito non è valido',
            'accessopolis.error.required': 'Questo campo è obbligatorio',
            'accessopolis.search.suggestions': 'Cerca una struttura o località',
            'accessopolis.location.type': 'Tipologia della struttura',
            'accessopolis.location.address': 'Indirizzo della struttura',
            'accessopolis.cancel': 'Annulla',
            'accessopolis.save': 'Salva',
            'accessopolis.selected.categories': 'Categorie Selezionate',
            'accessopolis.location.not-found': 'Nessuna struttura trovata',
            'accessopolis.location.new': 'Aggiungi',
            'accessopolis.back-to-list': 'Torna alla lista',
            'report-a-problem': 'Segnala un problema',
            'accessopolis.vote.now' : 'Dai il tuo voto',
            'accessopolis.voting': 'Vota!',
            'accessopolis.welcome': 'benvenuto/a in Accessopolis.ch',
            'accessopolis.back-to-home': 'Torna ad Accessopolis',
            'accessopolis.exit' : 'Logout',
            'accessopolis.sign-in' : 'Accedi con Google',
            'accessopolis.comment': 'Commenta'
        });
        $translateProvider.preferredLanguage('it');
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
        $translateProvider.directivePriority(222); //see https://github.com/angular-translate/angular-translate/issues/949
    })
    .controller('AppCtrl', function ($scope, Auth, $translate, $firebaseObject, Ref) {
        $scope.user = Auth.$getAuth();
        if ($scope.user) {
            $scope.profile = $firebaseObject(Ref.child('users/' + $scope.user.uid));
        }
        $scope.lang = "it";
        $scope.changeLanguage = function (key) {
            $scope.lang = key;
            $translate.use(key);
        };
    });
