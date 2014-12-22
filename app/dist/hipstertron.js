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
        /*$routeProvider.when('/about', {
            templateUrl: 'partials/about.html',
            controller: 'AboutCtrl'
        });*/
        $routeProvider.when('/info/:type', {
            templateUrl: 'partials/info.html',
            controller: 'InfoCtrl'
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
/* Controllers */

angular.module('hipstertron.controllers', [])

.controller('MainCtrl', ['$scope', 'submitEmailService',
    function($scope, submitEmailService) {
        $scope.userEmail = {}
        $scope.userEmail.frequency = "weekly"

        $scope.errorHandler = function() {
            $scope.emailError = true
        }

        $scope.successHandler = function() {
            $scope.signedUp = true;
        }

        $scope.signUserUp = function(userEmail) {
            if (userEmail.email) {
                $scope.emailPlease = false;
                submitEmailService.submitEmail(userEmail, $scope.successHandler, $scope.errorHandler)
            } else {
                $scope.emailPlease = true;
            }
        }

    }
])
//
.controller('CalendarCtrl', ['$scope', 'getConcertsService',
    function($scope, getConcertsService) {
        $scope.concertListings = {}
        var resultCount = 120;
        var offset = 0;
        var runCount = [];
        runCount.push(resultCount);

        // Testing : check whether this is returning a proper object and whether each object has the required properties.
        getConcertsService.getConcerts(resultCount, offset, function(response) {
            $scope.concertListings = response.data.concertListings;
        })

        // Badly needs some comments
        $(window).scroll(function(event) {
            if ($(this).scrollTop() + 1000 > $(document).height() - $(window).height()) {
                if (runCount.length === 1) {
                    resultCount = 500;
                    runCount.push(resultCount)
                    getConcertsService.getConcerts(resultCount, runCount[0], function(response) {
                        $scope.concertListings = $scope.concertListings.concat(response.data.concertListings)
                    })
                }
            }
        });

    }
])

.controller('InfoCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {

        if ($routeParams.type === 'about-hipstertron') {
            $scope.aboutRequested = true;
            activateNav('aboutActive')
        } else if ($routeParams.type === 'find-tickets') {
            $scope.findRequested = true;
            activateNav('findActive')
        } else if ($routeParams.type === 'reserve-tickets') {
            $scope.reserveRequested = true;
            activateNav('reserveActive')
        } else if ($routeParams.type === 'cheap-tickets') {
            $scope.cheapRequested = true;
            activateNav('cheapActive')
        } else {
            $scope.aboutRequested = true;
            activateNav('aboutActive')
        }

        function activateNav(correctNav) {
            var navOptions = ["aboutActive", "findActive", "reserveActive", "cheapActive"];

            for (var i = 0; navOptions.length > i; i++) {
                var t = navOptions[i]
                if (navOptions[i] === correctNav) {
                    $scope[t] = "info-link-active"
                } else {
                    $scope[t] = ""
                }
            }
        }

    }
])

.controller('SignUpCtrl', ['$scope', 'submitEmailService',
    // DRY it up
    function($scope, submitEmailService) {
        $scope.userEmail = {}
        $scope.userEmail.frequency = "weekly"

        $scope.signUserUp = function(userEmail) {
            if (userEmail.email) {
                $scope.emailPlease = false;
                submitEmailService.submitEmail(userEmail, function(response) {
                    $scope.signedUp = true;
                })
            } else {
                $scope.emailPlease = true;
            }
        }

    }
])

.controller('PrivacyCtrl', ['$scope',
    function($scope) {

    }
]);
/* Services */

angular.module('hipstertron.services', [])

.factory('environmentService', ['$http',
    function($http) {
        return {
            getPrefix: function() {
                var envPrefix = {
                    prod: "http://hipstertron-data.herokuapp.com",
                    local: "http://localhost:8000"
                }
                return envPrefix['prod'];
            },
        }
    }
])

.factory('submitEmailService', ['$http', 'environmentService',
    function($http, environmentService) {
        return {
            submitEmail: function(email, callback, errorHandler) {
                $http.post(environmentService.getPrefix() + "/sendEmail", email)
                    .success(function(response) {
                        return callback(response)
                    })
                    .error(function(response) {
                        return errorHandler(response)
                    });
            }
        }
    }
])

.factory('getConcertsService', ['$http', 'environmentService',
    function($http, environmentService) {
        return {
            // Testing: test proper offset combined with resultCount
            getConcerts: function(resultCount, offset, callback) {
                $http.get(environmentService.getPrefix() + "/getConcerts/" + resultCount + "/" + offset, {
                    cache: true
                })
                    .then(function(response) {
                        return callback(response)
                    });
            }
        }
    }
])