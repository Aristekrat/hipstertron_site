angular.module("afkl.lazyImage",[]),angular.module("afkl.lazyImage").service("afklSrcSetService",["$window",function(a){"use strict";function b(a){this.src=a.src,this.w=a.w||1/0,this.h=a.h||1/0,this.x=a.x||1}var c=/^[0-9]+$/,d=function(a){for(var b=a.split(/\s/),d={},e=0,f=b.length;f>e;e++){var g=b[e];if(g.length>0){var h=g.slice(-1),i=g.substring(0,g.length-1),j=parseInt(i,10),k=parseFloat(i);i.match(c)&&"w"===h?d[h]=j:i.match(c)&&"h"===h?d[h]=j:isNaN(k)||"x"!==h||(d[h]=k)}}return d},e=function(a,b){for(var c=a[0],d=0,e=a.length;e>d;d++){var f=a[d];b(f,c)&&(c=f)}return c},f=function(a,b){for(var c=a.length-1;c>=0;c--){var d=a[c];b(d)&&a.splice(c,1)}return a},g=function(b,c){if(b){c||(c={w:a.innerWidth||document.documentElement.clientWidth,h:a.innerHeight||document.documentElement.clientHeight,x:a.devicePixelRatio||1});var d=b.slice(0),g=e(d,function(a,b){return a.w>b.w});f(d,function(){return function(a){return a.w<c.w}}(this)),0===d.length&&(d=[g]);var h=e(d,function(a,b){return a.h>b.h});f(d,function(){return function(a){return a.h<c.h}}(this)),0===d.length&&(d=[h]);var i=e(d,function(a,b){return a.x>b.x});f(d,function(){return function(a){return a.x<c.x}}(this)),0===d.length&&(d=[i]);var j=e(d,function(a,b){return a.w<b.w});f(d,function(a){return a.w>j.w});var k=e(d,function(a,b){return a.h<b.h});f(d,function(a){return a.h>k.h});var l=e(d,function(a,b){return a.x<b.x});return f(d,function(a){return a.x>l.x}),d[0]}},h=function(a){var c=[],e=a.src,f=a.srcset;if(f){var h=function(a){for(var b=0,d=c.length;d>b;b++){var e=c[b];if(e.x===a.x&&e.w===a.w&&e.h===a.h)return}c.push(a)},i=function(){for(var a,c,g=f,i=0,j=[];""!==g;){for(;" "===g.charAt(0);)g=g.slice(1);i=g.indexOf(" "),-1!==i?(a=g.slice(0,i),g=g.slice(i+1),i=g.indexOf(","),-1===i?(c=g,g=""):(c=g.slice(0,i),g=g.slice(i+1)),j.push({url:a,descriptors:c})):(j.push({url:g,descriptors:""}),g="")}for(var k=0,l=j.length;l>k;k++){var m=j[k],n=d(m.descriptors);h(new b({src:m.url,x:n.x,w:n.w,h:n.h}))}e&&h(new b({src:e}))};i();var j=g(c),k={best:j,candidates:c};return c=null,k}};return{get:h,image:g}}]),angular.module("afkl.lazyImage").directive("afklImageContainer",function(){"use strict";return{restrict:"A",controller:["$scope","$element",function(a,b){b.data("afklImageContainer",b)}]}}).directive("afklLazyImage",["$window","$timeout","afklSrcSetService",function(a,b,c){"use strict";var d=function(a){var b,d=c.get({srcset:a});return d&&(b=d.best.src),b};return{restrict:"A",link:function(c,e,f){var g=e.inheritedData("afklImageContainer");g||(g=angular.element(f.afklLazyImageContainer||a));var h,i,j=!1,k=f.afklLazyImage,l=f.afklLazyImageOptions?angular.fromJson(f.afklLazyImageOptions):{},m=null,n=l.offset?l.offset:50,o="afkl-lazy-image-loading",p=function(){if(g.scrollTop){var a=g.scrollTop();if(a)return a}var b=g[0];return void 0!==b.pageYOffset?b.pageYOffset:void 0!==b.scrollTop?b.scrollTop:document.documentElement.scrollTop||0},q=function(){if(g.innerHeight)return g.innerHeight();var a=g[0];return void 0!==a.innerHeight?a.innerHeight:void 0!==a.clientHeight?a.clientHeight:document.documentElement.clientHeight||0},r=function(){if(e.offset)return e.offset().top;var a=e[0].getBoundingClientRect();return a.top+p()-document.documentElement.clientTop},s=function(){return e.offset?e.offset().top-g.offset().top:e[0].getBoundingClientRect().top-g[0].getBoundingClientRect().top},t=function(){l.background?e[0].style.backgroundImage='url("'+m+'")':i[0].src=m},u=function(){j=!0,m=d(k),m&&(l.background||i||(e.addClass(o),i=angular.element('<img alt="" class="afkl-lazy-image" src=""/>'),i.one("load",w),e.append(i)),t()),g.off("scroll",x)},v=function(){if(j){var a=d(k);a!==m&&(m=a,t())}};v();var w=function(){e.removeClass(o)},x=function(){var b,c,d,e=q(),f=p(),h=g[0]===a?r():s();d=g[0]===a?e+f:e,b=h-d,c=n>=b,c&&!j&&u()},y=function(){b.cancel(h),h=b(v,300)},z=function(){b.cancel(h),g.off("scroll",x),angular.element(a).off("resize",y),g[0]!==a&&g.off("resize",y),i&&i.remove(),i=h=m=void 0};return g.on("scroll",x),angular.element(a).on("resize",y),g[0]!==a&&g.on("resize",y),f.$observe("afklLazyImage",function(){k=f.afklLazyImage,j&&u()}),l.nolazy&&u(),c.$on("$destroy",function(){return z()}),x()}}}]);
'use strict';

// Declare app level module which depends on filters, and services
angular.module('hipstertron', [
    'ngRoute',
    'hipstertron.services',
    'hipstertron.controllers',
    'afkl.lazyImage'
])

.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/main.html',
            controller: 'MainCtrl',
            title: 'Find Concerts and Concert Tickets in Denver',
            description: 'Hipster Tron tells you if an artist in your iTunes library is coming to town as soon as the announcement comes out, 100% Free.'
        });
        $routeProvider.when('/calendar/', {
            templateUrl: 'partials/calendar.html',
            controller: 'CalendarCtrl',
            title: 'List of Denver Concerts',
            description: 'A full list of all concerts coming to Denver.'
        });
        $routeProvider.when('/info/:type', {
            templateUrl: 'partials/info.html',
            controller: 'InfoCtrl'
        });
        $routeProvider.when('/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'SignUpCtrl',
            title: 'Sign Up for Hipstertron',
            description: 'Sign up for Hipstertron to find out when your favorite bands are coming to town and get help getting your hands on tickets'
        });
        $routeProvider.when('/privacy-policy', {
            templateUrl: 'partials/privacy-policy.html',
            controller: 'PrivacyCtrl',
            title: 'Privacy Policy',
            description: 'This page sets out Hipstertron\'s Privacy Policy'
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true).hashPrefix('!');
    }
])

.controller('AppCtrl', ['$scope', '$route', '$location',
    function($scope, $route, $location) {
        $scope.$on("$routeChangeSuccess", function($currentRoute, $previousRoute) {
            $scope.seo = {
                title: $route.current.title,
                description: $route.current.description
            }
        });
    }
]);
/* Controllers */

angular.module('hipstertron.controllers', [])

.controller('MainCtrl', ['$scope', 'submitEmailService',
    function($scope, submitEmailService) {
        $scope.userEmail = {}
        $scope.userEmail.frequency = "weekly"

        $scope.errorHandler = function() {
            $scope.emailError = true
        }

        $scope.successHandler = function() {
            $scope.signedUp = true;
        }

        $scope.signUserUp = function(userEmail) {
            if (userEmail.email) {
                $scope.emailPlease = false;
                submitEmailService.submitEmail(userEmail, $scope.successHandler, $scope.errorHandler)
            } else {
                $scope.emailPlease = true;
            }
        }
    }
])

.controller('CalendarCtrl', ['$scope', '$location', 'getConcertsService',
    function($scope, $location, getConcertsService) {
        $scope.concertListings = {};
        var sections = ['end', 'middle', 'beginning']

        getConcertsService.getConcerts(sections.pop(), function(response) {
            $scope.concertListings = response.data;
            // TODO - refactor
            setTimeout(function() {
                if (sections.length > 0) {
                    getConcertsService.getConcerts(sections.pop(), function(secondResponse) {
                        $scope.concertListings = $scope.concertListings.concat(secondResponse.data);
                        setTimeout(function() {
                            if (sections.length !== 0) {
                                getConcertsService.getConcerts(sections.pop(), function(thirdResponse) {
                                    $scope.concertListings = $scope.concertListings.concat(thirdResponse.data);
                                });
                            }
                        }, 0);
                    });
                }
            }, 0);
        });

        /*        function foo(response, priorResponse) {
            $scope.concertListings = response.data.concat(priorResponse);
            setTimeout(function() {
                console.log(sections.length);
                if (sections.length !== 0) {
                    getConcertsService.getConcerts(sections.pop(), function(response) {
                        console.log(response);
                        foo(response, $scope.concertListings);
                    })
                }
            }, 0);
        }

        var noPrior = [];
        */
        /*
        var resultCount = 120;
        var offset = 0;
        var runCount = [];
        runCount.push(resultCount);

         window.onscroll = function(event) {
            // This initialization stuff cannot be moved outside of the function.
            var body = document.body;
            var html = document.documentElement;
            var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            var target = height / 2;
            if (window.scrollY > target) {
                if (runCount.length === 1) {
                    resultCount = 500;
                    runCount.push(resultCount)
                    getConcertsService.getConcerts(resultCount, runCount[0], function(response) {
                        $scope.concertListings = $scope.concertListings.concat(response.data.concertListings)
                    })
                }
            }
        };*/

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
            }
        } else if ($routeParams.type === 'find-tickets') {
            $scope.findRequested = true;
            activateNav('findActive');
            $scope.$parent.seo = {
                title: "Concert Finder in Denver",
                description: "Hipstertron will let you know when your favorite bands are coming to Denver, 100% free."
            }
        } else if ($routeParams.type === 'reserve-tickets') {
            $scope.reserveRequested = true;
            activateNav('reserveActive');
            $scope.$parent.seo = {
                title: "Reserve Concert Tickets, Get Concert Tickets Denver",
                description: "Reserve concert tickets in advance with Hipstertron, 100% free."
            }
        } else if ($routeParams.type === 'cheap-tickets') {
            $scope.cheapRequested = true;
            activateNav('cheapActive');
            $scope.$parent.seo = {
                title: "Find Cheap Concert Tickets Denver",
                description: "Get notified whenever you can pick up cheap concert tickets for bands you like."
            }
        } else {
            $scope.aboutRequested = true;
            activateNav('aboutActive');
            $scope.$parent.seo = {
                title: "About Hipstertron",
                description: "Sign Up for Hipstertron to get notified whenever your favorite bands are coming to Denver and help getting tickets."
            }
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

        $scope.errorHandler = function() {
            $scope.emailError = true
        }

        $scope.successHandler = function() {
            $scope.signedUp = true;
        }

        $scope.signUserUp = function(userEmail) {
            if (userEmail.email) {
                $scope.emailPlease = false;
                submitEmailService.submitEmail(userEmail, $scope.successHandler, $scope.errorHandler)
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
                return envPrefix['local'];
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
            getConcerts: function(section, callback) {
                $http.get("http://localhost:9000" + "/get-concerts/" + section, {
                    cache: true
                })
                    .then(function(response) {
                        return callback(response)
                    });
            }
        }
    }
])

/*
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
 */