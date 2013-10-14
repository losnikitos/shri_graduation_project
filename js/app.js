var app = angular.module('app', ['ngRoute', 'ngAnimate', 'route-segment', 'view-segment', 'ngResource', 'shri.components'], function () {
});

app.config(function ($routeSegmentProvider, $routeProvider) {

    $routeSegmentProvider.options.autoLoadTemplates = true;

    $routeSegmentProvider
        .when('/students', 'students')
        .when('/students/:id', 'students.details')
        .when('/lectures', 'lectures')
        .when('/lectures/:id', 'lecture.details')

        .segment('students', {
            templateUrl: 'parts/studentsList.html',
            controller: StudentsCtrl,
            resolve: {

                data: function ($timeout, loader, Data) {
                    Data('students');
                }}})

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
//    console.log('studstrl'+$scope.students[3]);

    var students = Data('students');

    var numColumns = 5;
    var rowsCount = Math.ceil(students.length / numColumns);

    var rows = [];
    for (var i = 0; i < rowsCount; i++) {
        rows[i] = [];
        for (var j = 0; j < numColumns; j++) {
            var s = students[i * numColumns + j];
            if (s) rows[i][j] = s;
        }
    }
    $scope.rows = rows;

}


function StudentDetailsCtrl($scope, $routeSegment, Data) {
    $scope.student = Data('students')[$routeSegment.$routeParams.id - 1];
    $scope.collapse = function () {
    };
}

function Section2Ctrl($scope, $routeSegment) {

    $scope.$routeSegment = $routeSegment;
    $scope.test = { textValue: '' };
    $scope.items = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
}

function ErrorCtrl($scope, error) {
    $scope.error = error;
}

function SlowDataCtrl($scope, data, loader) {
    loader.show = false;
    $scope.data = data;
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


$(function() {
    $('.app-folders-container').appFolders();
});