//angular.module('shri', []).
//    config(['$routeProvider', function ($routeProvider) {
//        $routeProvider.
//
//            when('/', {controller:StudentsCtrl, templateUrl:'list.html'}).
////            when('/edit/:studentID', {controller: EditStudentCtrl, templateUrl:'parts/editStudent.html'}).
//
//            when('/students', {templateUrl: 'parts/students.html', controller: StudentsCtrl}).
//            when('/students/:studentID', {templateUrl: 'parts/studentDetails.html', controller: StudentDetailsCtrl}).
//
//            when('/courses', {templateUrl: 'parts/courses.html', controller: CoursesCtrl}).
//            when('/courses/:courseID', {templateUrl: 'parts/courseDetails.html', controller: CourseDetailsCtrl}).
//            otherwise({redirectTo: '/'})}]);
//
//


$(function () {
    //parallax scrolling
    var bg = $(".jumbotron");
    $(window).scroll(function (e) {
        parallaxScroll(bg);
    });
});

function parallaxScroll(el) {
    var yPos = -($(window).scrollTop() / 2) - 50;
    var coords = 'center ' + yPos + 'px';
    el.css({ backgroundPosition: coords });
}