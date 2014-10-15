'use strict';

/* Directives */

angular.module('hipstertron.directives', [])

//Not actually in use.
/*.directive('scroller', function() {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, elem, attrs) {
            var rawElement = elem[0];
            elem.bind('scroll', function() {
                if ((rawElement.scrollTop + rawElement.offsetHeight + 5) >= rawElement.scrollHeight) { //new
                    scope.loadMore();
                }
            });
        }
    };
});*/