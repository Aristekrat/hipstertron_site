'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('hipstertron.services', [])

.factory('submitEmailService', function($http) {
    return {
        submitEmail: function(email) {
            $http.post("/sendemail", {
                "email": email
            })
                .then(function(data) {
                    return callback(data)
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
});