'use strict';

/* Controllers */

angular.module('hipstertron.controllers', [])

.controller('MainCtrl', ['$scope', 'submitEmailService', 'getEnvironmentService',

    // Submits user email to node.js backend
    function($scope, submitEmailService, getEnvironmentService) {

        $scope.signUserUp = function(userEmail) {
            if (userEmail) {
                submitEmailService.submitEmail(userEmail, function(response) {
                    console.log(response)
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