'use strict';

/* Services */

angular.module('hipstertron.services', [])

.factory('submitEmailService', function($http) {
    return {
        submitEmail: function(email) {
            $http.post("/sendemail", {
                "email": email
            })
                .then(function(data) {
                    console.log(data)
                });
        }
        /*
		    $http.get(configService.getApi() + '/rewards', {
		        cache: true,
		        headers: {
		            'x-auth-token': sessionService.getToken()
		        }
		    })
		        .success(function (data) {
		            return callback(data);
		        })
		        .error(function (data) {
		            return callback(data);
		        });
			},
		*/
    }
})

.factory('getConcertsService', function($http) {
    return {
        touchPy: function(callback) {
            $http.get("http://localhost:5000/touchme")
                .then(function(data) {
                    console.log("Reached this block!")
                    return callback(data)
                });
        }
    }
})