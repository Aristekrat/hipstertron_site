/* Controllers */

angular.module('hipstertron.controllers', [])

.controller('MainCtrl', ['$scope', 'submitEmailService',
    function($scope, submitEmailService) {
        $scope.userEmail = {}
        $scope.userEmail.frequency = "weekly"
        $scope.userEmail.email = "hay@there.com"

        $scope.signUserUp = function(userEmail) {
            submitEmailService.sendEmail(userEmail, function(response) {
                console.log(response)
            })
            /*            if (userEmail.email) {
                $scope.emailPlease = false;
                submitEmailService.submitEmail(userEmail, function(response) {
                    $scope.signedUp = true;
                })
            } else {
                $scope.emailPlease = true;
            }*/
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