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

        $scope.concertListings = {}

        var resultCount = 120;
        var offset = 0;
        var runCount = [];
        runCount.push(resultCount)
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

        getConcertsService.getConcerts(resultCount, offset, function(response) {
            $scope.concertListings = response.data.concertListings;
        })

    }
])

.controller('AboutCtrl', ['$scope',
    function($scope) {

    }
])

.controller('SignUpCtrl', ['$scope', 'submitEmailService',
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