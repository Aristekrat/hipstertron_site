'use strict';

/* Services */

angular.module('hipstertron.services', [])

.factory('getEnvironmentService', function($http) {
    return {
        getEnv: function() {
            $http.get("/getEnv", {
                cache: true
            })
                .then(function(response) {
                    console.log("Reached here")
                    if (response.data === "development") {
                        console.log("Then here")
                        return "http://localhost:8000"
                    } else if (response.data === "production") {
                        return "http://hipstertron-data.herokuapp.com"
                    }
                });
        }
    }
})



.factory('submitEmailService', function($http, getEnvironmentService) {
    return {
        submitEmail: function(email, callback) {
            console.log(email)
            $http.post("http://localhost:8000" + "/sendEmail", {
                "email": email
            })
                .then(function(response) {
                    return callback(response)
                });
        }
    }
})

.factory('getConcertsService', function($http, $timeout, getEnvironmentService) {
    return {
        getConcerts: function(callback) {
            $http.get("http://localhost:8000" + "/getConcerts", {
                cache: true
            })
                .then(function(response) {
                    return callback(response)
                });
        }
    }
})