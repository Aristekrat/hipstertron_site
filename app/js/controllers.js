/* Controllers */

angular.module('hipstertron.controllers', [])

.controller('MainCtrl', ['$scope', 'submitEmailService',
    function($scope, submitEmailService) {
        $scope.userEmail = {};
        $scope.userEmail.frequency = "weekly";

        $scope.errorHandler = function() {
            $scope.emailError = true;
        };

        $scope.successHandler = function() {
            $scope.signedUp = true;
        };

        $scope.signUserUp = function(userEmail) {
            if (userEmail.email) {
                $scope.emailPlease = false;
                submitEmailService.submitEmail(userEmail, $scope.successHandler, $scope.errorHandler);
            } else {
                $scope.emailPlease = true;
            }
        };
    }
])

.controller('CalendarCtrl', ['$scope', '$location', 'getConcertsService',
    function($scope, $location, getConcertsService) {
        $scope.concertListings = [];
        var sections = ['end', 'middle', 'beginning'];

        function requestConcerts() {
            getConcertsService.getConcerts(sections.pop(), function(response) {
                $scope.concertListings = $scope.concertListings.concat(response.data);
            });

            setTimeout(function() {
                if (sections.length !== 0) {
                    requestConcerts();
                } else {
                    console.log("All concerts requested");
                }
            });
        }

        requestConcerts();
    }
])

.controller('InfoCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {

        if ($routeParams.type === 'about-hipstertron') {
            $scope.aboutRequested = true;
            activateNav('aboutActive');
            $scope.$parent.seo = {
                title: "About Hipstertron",
                description: "Sign Up for Hipstertron to get notified whenever your favorite bands are coming to Denver and help getting tickets."
            };
        } else if ($routeParams.type === 'find-tickets') {
            $scope.findRequested = true;
            activateNav('findActive');
            $scope.$parent.seo = {
                title: "Concert Finder in Denver",
                description: "Hipstertron will let you know when your favorite bands are coming to Denver, 100% free."
            };
        } else if ($routeParams.type === 'reserve-tickets') {
            $scope.reserveRequested = true;
            activateNav('reserveActive');
            $scope.$parent.seo = {
                title: "Reserve Concert Tickets, Get Concert Tickets Denver",
                description: "Reserve concert tickets in advance with Hipstertron, 100% free."
            };
        } else if ($routeParams.type === 'cheap-tickets') {
            $scope.cheapRequested = true;
            activateNav('cheapActive');
            $scope.$parent.seo = {
                title: "Find Cheap Concert Tickets Denver",
                description: "Get notified whenever you can pick up cheap concert tickets for bands you like."
            };
        } else {
            $scope.aboutRequested = true;
            activateNav('aboutActive');
            $scope.$parent.seo = {
                title: "About Hipstertron",
                description: "Sign Up for Hipstertron to get notified whenever your favorite bands are coming to Denver and help getting tickets."
            };
        }

        function activateNav(correctNav) {
            var navOptions = ["aboutActive", "findActive", "reserveActive", "cheapActive"];
            for (var i = 0; navOptions.length > i; i++) {
                var t = navOptions[i];
                if (navOptions[i] === correctNav) {
                    $scope[t] = "info-link-active";
                } else {
                    $scope[t] = "";
                }
            }
        }

    }
])

.controller('SignUpCtrl', ['$scope', 'submitEmailService',
    // DRY it up
    function($scope, submitEmailService) {
        $scope.userEmail = {};
        $scope.userEmail.frequency = "weekly";

        $scope.errorHandler = function() {
            $scope.emailError = true;
        };

        $scope.successHandler = function() {
            $scope.signedUp = true;
        };

        $scope.signUserUp = function(userEmail) {
            if (userEmail.email) {
                $scope.emailPlease = false;
                submitEmailService.submitEmail(userEmail, $scope.successHandler, $scope.errorHandler);
            } else {
                $scope.emailPlease = true;
            }
        };

    }
])

.controller('PrivacyCtrl', ['$scope',
    function($scope) {

    }
]);