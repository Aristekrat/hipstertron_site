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
'use strict';

/* Controllers */

angular.module('hipstertron.controllers', [])

.controller('MainCtrl', ['$scope', 'submitEmailService',
    function($scope, submitEmailService) {

        $scope.signUserUp = function(userEmail) {
            if (userEmail) {
                submitEmailService.submitEmail(userEmail, function(response) {
                    $scope.signedUp = true;
                })
            }
        }

    }
])

.controller('AboutCtrl', ['$scope',
    function($scope) {

    }
])

.controller('CalendarCtrl', ['$scope', 'getConcertsService',
    function($scope, getConcertsService) {

        getConcertsService.getConcerts(function(response) {
            $scope.concertListings = response.data.concertListings;
        })

    }
])

.controller('PrivacyCtrl', ['$scope',
    function($scope) {

    }
]);
'use strict';

/* Directives */


angular.module('hipstertron.directives', []).
directive('appVersion', ['version',
    function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }
]);
'use strict';

/* Filters */

angular.module('hipstertron.filters', []).
filter('interpolate', ['version',
    function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }
]);
'use strict';

/* Services */

angular.module('hipstertron.services', [])

.factory('environmentService', function ($http) {
    return {
        getPrefix: function () {
            var envPrefix = {
                prod: "http://hipstertron-data.herokuapp.com",
                local: "http://localhost:8000"
            }
            return envPrefix['prod'];
        },
    }
})

.factory('submitEmailService', function ($http, environmentService) {
    return {
        submitEmail: function (email, callback) {
            $http({
                method: 'POST',
                url: environmentService.getPrefix() + "/sendEmail",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(email)
            })
                .then(function (response) {
                    return callback(response)
                });
        }
    }
})

.factory('getConcertsService', function ($http, $timeout, environmentService) {
    return {
        getConcerts: function (callback) {
            $http.get(environmentService.getPrefix() + "/getConcerts", {
                cache: true
            })
                .then(function (response) {
                    return callback(response)
                });
        }
    }
})