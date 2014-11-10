'use strict';

describe('MainCtrl', function() {
    var scope; //we'll use this scope in our tests

    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('hipstertron'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller) {
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('MainCtrl', {
            $scope: scope
        });
    }));
    it('should be the first test', function() {
        expect(scope.userEmail.frequency = "weekly")
    })
})

/*describe("My First Test", function() {
    it("should be true", function() {
        expect(true).toBe(true);
    });
});*/