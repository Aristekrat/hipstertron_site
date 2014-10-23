'use strict';

/* Controllers */

angular.module('hipstertron.controllers', [])

.controller('MainCtrl', ['$scope', 'submitEmailService',
	function ($scope, submitEmailService) {
		$scope.userEmail = {}
		$scope.userEmail.frequency = "weekly"

		$scope.signUserUp = function (userEmail) {
			if (userEmail.email) {
				$scope.emailPlease = false;
				submitEmailService.submitEmail(userEmail, function (response) {
					$scope.signedUp = true;
				})
			} else {
				$scope.emailPlease = true;
			}
		}

	}
])

.controller('CalendarCtrl', ['$scope', 'getConcertsService',
	function ($scope, getConcertsService) {

		$scope.concertListings = {}

		getConcertsService.getFirstConcerts(function (response) {
			$scope.concertListings = response.data.concertListings;
		})

		var executed = false;
		$(window).scroll(function (event) {
			if ($(this).scrollTop() + 1000 > $(document).height() - $(window).height() && !executed) {
				executed = true
				getConcertsService.getSecondConcerts(function (response) {
					for (var i = 0; i < response.data.concertListings.length; i++) {
						$scope.concertListings.push(response.data.concertListings[i])
					}
				})
			}
		});

	}
])

.controller('AboutCtrl', ['$scope',
	function ($scope) {

	}
])

.controller('SignUpCtrl', ['$scope',
	function ($scope) {

	}
])

/*.controller('ContactCtrl', ['$scope',
    function($scope) {

    }
])*/


.controller('PrivacyCtrl', ['$scope',
	function ($scope) {

	}
]);