/* Services */

angular.module('hipstertron.services', [])

.factory('environmentService', ['$http',
    function($http) {
        return {
            getPrefix: function() {
                var envPrefix = {
                    prod: "http://www.hipstertron.com",
                    local: "http://localhost:9000",
                };
                return envPrefix['prod'];
            },
            getDataPrefix: function() {
                var dataPrefix = {
                    dataProd: "http://hipstertron-data.herokuapp.com",
                    dataLocal: "http://localhost:8000"
                };
                return dataPrefix['dataProd'];
            }
        };
    }
])

.factory('submitEmailService', ['$http', 'environmentService',
    function($http, environmentService) {
        return {
            submitEmail: function(email, callback, errorHandler) {
                $http.post(environmentService.getDataPrefix() + "/sendEmail", email)
                    .success(function(response) {
                        return callback(response);
                    })
                    .error(function(response) {
                        return errorHandler(response);
                    });
            }
        };
    }
])

.factory('getConcertsService', ['$http', 'environmentService',
    function($http, environmentService) {
        return {
            getConcerts: function(section, callback) {
                $http.get(environmentService.getPrefix() + "/get-concerts/" + section, {
                    cache: true
                })
                    .then(function(response) {
                        return callback(response);
                    });
            }
        };
    }
]);