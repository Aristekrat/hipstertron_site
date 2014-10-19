'use strict';

/* Services */

angular.module('hipstertron.services', [])

.factory('environmentService', function($http) {
    return {
        getPrefix: function() {
            var envPrefix = {
                prod: "http://hipstertron-data.herokuapp.com",
                local: "http://localhost:8000"
            }
            return envPrefix['local'];
        },
    }
})

.factory('submitEmailService', function($http, environmentService) {
    return {
        submitEmail: function(email, callback) {
            console.log(email)
            $http({
                method: 'POST',
                url: environmentService.getPrefix() + "/sendEmail",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(email)
            })
                .then(function(response) {
                    return callback(response)
                });
        }
    }
})

.factory('getConcertsService', function($http, $timeout, environmentService) {
    return {
        getFirstConcerts: function(callback) {
            $http.get(environmentService.getPrefix() + "/getConcerts", {
                cache: true
            })
                .then(function(response) {
                    return callback(response)
                });
        },
        getSecondConcerts: function(callback) {
            $http.get(environmentService.getPrefix() + "/getConcertsTwo", {
                cache: true
            })
                .then(function(response) {
                    return callback(response)
                });
        }
    }
})