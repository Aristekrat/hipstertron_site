'use strict';

// Declare app level module which depends on filters, and services
angular.module('hipstertron', [
    'ngRoute',
    'hipstertron.filters',
    'hipstertron.services',
    'hipstertron.directives',
    'hipstertron.controllers'
]).
config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'partials/main.html',
            controller: 'MainCtrl'
        });
        $routeProvider.when('/about', {
            templateUrl: 'partials/about.html',
            controller: 'AboutCtrl'
        });
        $routeProvider.when('/calendar', {
            templateUrl: 'partials/calendar.html',
            controller: 'CalendarCtrl'
        });
        $routeProvider.when('/privacy-policy', {
            templateUrl: 'partials/privacy-policy.html',
            controller: 'PrivacyCtrl'
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }
]);