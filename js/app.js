var app = angular.module('app', ['ngRoute', 'ngAnimate', 'route-segment', 'view-segment', 'ngResource', '$strap.directives'], function () {});

app.config(function ($routeSegmentProvider, $routeProvider) {

    $routeSegmentProvider.options.autoLoadTemplates = true;

    $routeSegmentProvider
        .when('/students', 'students')
        .when('/students/:id', 'students.details')
        .when('/lectures', 'lectures')
        .when('/lectures/:id', 'lecture.details')

        .segment('students', {
            templateUrl: 'parts/studentsList.html',
            controller: StudentsCtrl })

        .within()
        .segment('details', {
            templateUrl: 'parts/studentExpanded.html',
            controller: StudentDetailsCtrl,
            dependencies: ['id']})
        .up()

        .segment('lectures', {
            templateUrl: 'parts/lecture.html',
            controller: MainCtrl})

        .within()
        .segment('details', {
            templateUrl: 'parts/lectureExpanded.html'})
        .up();

        $routeProvider.otherwise({redirectTo: '/students'});
});

app.value('loader', {show: false});

function MainCtrl($scope, $routeSegment, loader, Data) {

    $scope.$routeSegment = $routeSegment;
    $scope.loader = loader;
    $scope.students = Data('students');
}

function StudentsCtrl($scope, $routeSegment, Data) {
    $scope.students = Data('students');
    var students = Data('students');

}


function StudentDetailsCtrl($scope, $routeSegment, Data) {

//    $scope.person = Data('students')[$scope.id];

//    $scope.person = {
//        id: 1,
//        first_name: "John",
//        last_name: "Doe"
//    };
    console.log($routeSegment);

}

app.factory('Data', function ($resource) {
    var loader = $resource('data/:name.json');
    var loadList = ['students', 'lectures'];
    var data = {};
    for (var i = 0; i < loadList.length; i++)
        data[loadList[i]] = loader.query({name: (loadList[i])});

    return function (key) {
        return data[key];
    }
});

app.directive('myDirective', function () {
    return {
        scope: true,
        template: '<a class="btn" ng-class="{active: on}" ng-click="toggle()">Toggle me!</a>',
        link: function (scope, element, attrs) {
            scope.on = false;

            scope.toggle = function () {
                scope.on = !$scope.on;
            };
        }
    };
});
