angular.module('shri', []).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/students', {templateUrl: 'parts/students.html',   controller: StudentsCtrl}).
            when('/students/:studentID', {templateUrl: 'parts/studentDetails.html', controller: StudentDetailsCtrl}).

            when('/courses', {templateUrl: 'parts/courses.html', controller: CoursesCtrl}).
            when('/courses/:courseID', {templateUrl: 'parts/courseDetails.html', controller: CourseDetailsCtrl}).
            otherwise({redirectTo: '/students'});
    }]);