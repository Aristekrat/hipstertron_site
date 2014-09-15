'use strict';

/* Controllers */

angular.module('hipstertron.controllers', [])

.controller('MainCtrl', ['$scope', 'submitEmailService',

    // Submits user email to node.js backend
    function($scope, submitEmailService) {
        $scope.signUserUp = function(userEmail) {
            if (userEmail) {
                submitEmailService.submitEmail(userEmail)
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

        getConcertsService.touchPy(function(response) {
            $scope.concertListings = response.data.concertListings;
        })

        /** Successfully touches py, although takes a really long time to return for some odd reason
        $scope.touchPy = function() {
            getConcertsService.touchPy(function(response) {
                $scope.concertListings = response.data.concertListings;
            })
        }
        */

    }
])

.controller('PrivacyCtrl', ['$scope',
    function($scope) {

    }
]);