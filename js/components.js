angular.module('shri.components', []).
    directive('student', function() {
        return {
            restrict: 'E',
//            scope: {student: '@'},
//            transclude: false,
//              require: '^students',
//            link: function(scope, element, attrs, studentsCtrl) {
//                studentsCtrl.select(scope);
//            },
            templateUrl: 'parts/studentCompact.html',
            replace: true
        };
    });