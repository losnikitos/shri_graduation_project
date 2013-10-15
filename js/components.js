angular.module('shri.components', [])
    .directive('person', function () {
        return {
            restrict: 'E',
            templateUrl: 'parts/personCompact.html',
            replace: true
        };
    });