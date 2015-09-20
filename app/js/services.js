/* Services */

angular.module('hipstertron.services', [])

.factory('environmentService', ['$http',
    function($http) {
        return {
            getPrefix: function() {
                var envPrefix = {
                    prod: "http://hipstertron-data.herokuapp.com",
                    local: "http://localhost:8000"
                }
                return envPrefix['prod'];
            },
        }
    }
])

.factory('submitEmailService', ['$http', 'environmentService',
    function($http, environmentService) {
        return {
            submitEmail: function(email, callback, errorHandler) {
                $http.post(environmentService.getPrefix() + "/sendEmail", email)
                    .success(function(response) {
                        return callback(response)
                    })
                    .error(function(response) {
                        return errorHandler(response)
                    });
            }
        }
    }
])

.factory('getConcertsService', ['$http', 'environmentService',
    function($http, environmentService) {
        return {
            // Testing: test proper offset combined with resultCount
            getConcerts: function(resultCount, offset, callback) {
                $http.get(environmentService.getPrefix() + "/getConcerts/" + resultCount + "/" + offset, {
                    cache: true
                })
                    .then(function(response) {
                        return callback(response)
                    });
            }
        }
    }
])
