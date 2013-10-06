angular.module('shri', []).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.

            when('/students', {templateUrl: 'parts/students.html', controller: StudentsCtrl}).
            when('/students/:studentID', {templateUrl: 'parts/studentDetails.html', controller: StudentDetailsCtrl}).

            when('/courses', {templateUrl: 'parts/courses.html', controller: CoursesCtrl}).
            when('/courses/:courseID', {templateUrl: 'parts/courseDetails.html', controller: CourseDetailsCtrl}).
            otherwise({redirectTo: '/students'});
    }]);

$(function () {
//    $('.app-folders-container').appFolders();
    console.log('Дом построен');
    $.getJSON('data/students.json', function (data) {
        this.window["students"] = data
    });

    //parallax scrolling
    var bg = $(".jumbotron");
    $(window).scroll(function(e){
        parallaxScroll(bg);
    });
});

function parallaxScroll(el)
{
    var yPos = -($(window).scrollTop() / 2) - 50;
    var coords = 'center '+ yPos + 'px';
    el.css({ backgroundPosition: coords });
}