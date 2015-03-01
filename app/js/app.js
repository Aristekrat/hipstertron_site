'use strict';

// Declare app level module which depends on filters, and services
angular.module('hipstertron', [
    'ngRoute',
    'hipstertron.services',
    'hipstertron.controllers',
    'afkl.lazyImage'
])

.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: 'dist/partials/main.html',
            controller: 'MainCtrl',
            title: 'Find Concerts and Concert Tickets in Denver',
            description: 'Hipster Tron tells you if an artist in your iTunes library is coming to town as soon as the announcement comes out, 100% Free.'
        });
        $routeProvider.when('/calendar', {
            templateUrl: 'dist/partials/calendar.html',
            controller: 'CalendarCtrl',
            title: 'List of Denver Concerts',
            description: 'A full list of all concerts coming to Denver.'
        });
        $routeProvider.when('/info/:type', {
            templateUrl: 'dist/partials/info.html',
            controller: 'InfoCtrl'
        });
        $routeProvider.when('/signup', {
            templateUrl: 'dist/partials/signup.html',
            controller: 'SignUpCtrl',
            title: 'Sign Up for Hipstertron',
            description: 'Sign up for Hipstertron to find out when your favorite bands are coming to town and get help getting your hands on tickets'
        });
        $routeProvider.when('/privacy-policy', {
            templateUrl: 'dist/partials/privacy-policy.html',
            controller: 'PrivacyCtrl',
            title: 'Privacy Policy',
            description: 'This page sets out Hipstertron\'s Privacy Policy'
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true).hashPrefix('!');
    }
])

.controller('AppCtrl', ['$scope', '$route', '$location',
    function($scope, $route, $location) {
        $scope.$on("$routeChangeSuccess", function($currentRoute, $previousRoute) {
            $scope.seo = {
                title: $route.current.title,
                description: $route.current.description
            }
        });
    }
]);