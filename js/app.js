var module = angular.module('shri', ['shri.services', 'ui.bootstrap', 'ui.router']);
module.directive('student_compact', function () {
    return {
        templateUrl: 'parts/student_compact.html'
    }
});

module.directive('student_expanded', function () {
    return {
        templateUrl: 'parts/student_expanded.html'
    }
});

module.config(function($stateProvider){
    $stateProvider.state('students', {
        templateUrl: 'parts/students_list.html'
    });
})




/**
 * Parallax scrolling
 *
 *
 *
 *
 */

$(function () {
    var bg = $(".parallax");
    $(window).scroll(function (e) {
        parallaxScroll(bg);
    });
});

function parallaxScroll(el) {
    var yPos = -($(window).scrollTop() / 2) - 50;
    var coords = 'center ' + yPos + 'px';
    el.css({ backgroundPosition: coords });
}


//        .config(['$routeProvider', function($routeProvider) {
//            $routeProvider.
//            when('/', {controller:StudentsCtrl, templateUrl:'list.html'}).
//            when('/edit/:studentID', {controller: EditStudentCtrl, templateUrl:'parts/editStudent.html'}).
//
//            when('/students', {templateUrl: 'parts/students_list.html', controller: StudentsCtrl}).
//            when('/students/:studentID', {templateUrl: 'parts/student_compact.html', controller: StudentDetailsCtrl}).
//
//            when('/courses', {templateUrl: 'parts/courses.html', controller: CoursesCtrl}).
//            when('/courses/:courseID', {templateUrl: 'parts/courseDetails.html', controller: CourseDetailsCtrl}).
//            otherwise({redirectTo: '/'})}]);


//    config(['$routeProvider', function ($routeProvider) {
//        $routeProvider.
//
//            when('/', {controller:StudentsCtrl, templateUrl:'list.html'}).
//            when('/edit/:studentID', {controller: EditStudentCtrl, templateUrl:'parts/editStudent.html'}).
//
//            when('/students', {templateUrl: 'parts/students_list.html', controller: StudentsCtrl}).
//            when('/students/:studentID', {templateUrl: 'parts/student_compact.html', controller: StudentDetailsCtrl}).
//
//            when('/courses', {templateUrl: 'parts/courses.html', controller: CoursesCtrl}).
//            when('/courses/:courseID', {templateUrl: 'parts/courseDetails.html', controller: CourseDetailsCtrl}).
//            otherwise({redirectTo: '/'})}]);
//
//

