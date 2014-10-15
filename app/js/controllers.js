'use strict';

/* Controllers */

angular.module('hipstertron.controllers', [])

.controller('MainCtrl', ['$scope', 'submitEmailService',
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

.controller('CalendarCtrl', ['$scope', 'getConcertsService',
    function($scope, getConcertsService) {

        getConcertsService.getConcerts(function(response) {
            $scope.concertListings = response.data.concertListings;
        })

        // Possibly working without bugs, needs to be tested with proper loading page to confirm. 
        /*        $(window).scroll(function(event) {
            if ($(this).scrollTop() == $(document).height() - $(window).height()) {
                alert('Reached the bottom');
            }
        });*/

    }
])

.controller('AboutCtrl', ['$scope',
    function($scope) {

    }
])

.controller('SignUpCtrl', ['$scope',
    function($scope) {

    }
])

.controller('ContactCtrl', ['$scope',
    function($scope) {

    }
])


.controller('PrivacyCtrl', ['$scope',
    function($scope) {

    }
]);