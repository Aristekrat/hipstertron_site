'use strict';

// Declare app level module which depends on filters, and services
angular.module('hipstertron', [
    'ngRoute',
    'hipstertron.services',
    'hipstertron.controllers',
    'angulartics',
    'angulartics.google.analytics'
]).
config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/main.html',
            controller: 'MainCtrl'
        });
        $routeProvider.when('/calendar', {
            templateUrl: 'partials/calendar.html',
            controller: 'CalendarCtrl'
        });
        $routeProvider.when('/about', {
            templateUrl: 'partials/about.html',
            controller: 'AboutCtrl'
        });
        $routeProvider.when('/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'SignUpCtrl'
        });
        $routeProvider.when('/privacy-policy', {
            templateUrl: 'partials/privacy-policy.html',
            controller: 'PrivacyCtrl'
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true).hashPrefix('!');
    }
]);