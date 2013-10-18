var app = angular.module('app', ['ngRoute', 'ngAnimate', 'route-segment', 'view-segment', 'ngResource', '$strap.directives'], function () {
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
            controller: StudentsCtrl })

        .within()
            .segment('details', {
                templateUrl: 'parts/studentExpanded.html',
                controller: StudentDetailsCtrl,
                dependencies: ['id']})
            .up()

        .segment('lectures.details', {
            templateUrl: 'parts/lectureExpanded.html'});

    $routeProvider.otherwise({redirectTo: '/students'});
});

app.value('loader', {show: false});

function StudentsCtrl($scope, $routeSegment, $modal, Data, $location) {
    $scope.students = Data('students');

    $scope.expandPerson = function(person) {
        console.log("Expand function called for " + person.first_name);
        $location.path("/students/" + person.id);

        var newScope = $scope.$new();
        newScope.person = person;

        $modal({
            template: 'parts/studentExpanded.html',
            persist: true,
            show: true,
            backdrop: 'static',
            scope: newScope
        });
    }

    var id = $routeSegment.$routeParams.id;
    console.log("Id="+id);
    if(id) $scope.expandPerson($scope.students[id-1]);
}


function StudentDetailsCtrl($scope, $routeSegment, Data) {
    console.log("StudentDetailsController called for id = " + $routeSegment.$routeParams.id);
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
