'use strict';

/* Controllers */

angular.module('hipstertron.controllers', [])

.controller('MainCtrl', ['$scope', 'submitEmailService',
    function($scope, submitEmailService) {
        $scope.signUserUp = function(userEmail) {
            if (userEmail) {
                submitEmailService.submitEmail(userEmail)
            }
        }


    }
])

.controller('CalendarCtrl', ['$scope',
    function($scope) {
        var concertData = [{
            date: "08/12/14 8:00PM",
            band: "Fire Crotches",
            venue: "Red Rocks Ampitheater"
        }, {
            date: "08/13/14 8:00PM",
            band: "Elastic Ass",
            venue: "The Curdle"
        }]

        $scope.concertListings = concertData;
    }
])

.controller('PrivacyCtrl', ['$scope',
    function($scope) {

    }
]);