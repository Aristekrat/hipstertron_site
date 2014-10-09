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