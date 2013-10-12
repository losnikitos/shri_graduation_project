var app = angular.module('app', ['ngRoute', 'ngAnimate', 'route-segment', 'view-segment', 'ngResource'],function(){});

app.config(function($routeSegmentProvider, $routeProvider) {
    
    $routeSegmentProvider.options.autoLoadTemplates = true;

    $routeSegmentProvider
        .when('/students',          'students')
        .when('/students/:id',      'students.details')
        .when('/lectures',          'lectures')
        .when('/lectures/:id',      'lectures.details')

        .segment('students', {
            templateUrl: 'parts/studentsList.html',
            controller: MainCtrl})
            
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
            templateUrl: 'parts/lectureExpanded.html',
//            controller: LectureDetailsCtrl,
            dependencies: ['id']})
        .up();

    // This is some usage of `resolve`, `untilResolved` and `resolveFailed` features
                    
    $routeSegmentProvider
    
        .when('/invalid-template', 's1.invalidTemplate')
        .when('/invalid-data', 's1.invalidData')
        .when('/slow-data', 's1.slowDataSimple')
        .when('/slow-data-loading', 's1.slowDataLoading')
        .when('/inline-view', 's1.inlineParent.inlineChildren')
        .when('/students/:id/slow',    's1.itemInfo.tabSlow')
        
        .within('s1')
            .segment('invalidTemplate', {
                templateUrl: 'this-does-not-exist.html',    // 404
                resolveFailed: {
                    templateUrl: 'templates/error.html',
                    controller: 'ErrorCtrl'
                }
            })
            .segment('invalidData', {
                templateUrl: 'templates/section1/home.html',     // Correct!
                resolve: {
                    data: function($q) {
                        return $q.reject('ERROR DESCRIPTION');     // Failed to load data
                    }
                },
                resolveFailed: {
                    templateUrl: 'templates/error.html',
                    controller: 'ErrorCtrl'
                }
            })
            .segment('slowDataSimple', {
                templateUrl: 'templates/section1/slow-data.html',
                controller: 'SlowDataCtrl',
                resolve: {
                    data: function($timeout, loader) {
                        loader.show = true;
                        return $timeout(function() { return 'SLOW DATA CONTENT'; }, 2000);
                    }
                }
            })
            .segment('slowDataLoading', {
                templateUrl: 'templates/section1/slow-data.html',
                controller: 'SlowDataCtrl',
                resolve: {
                    data: function($timeout) {
                        return $timeout(function() { return 'SLOW DATA CONTENT'; }, 2000);
                    }
                },
                untilResolved: {
                    templateUrl: 'templates/loading.html'
                }
            })
            .segment('inlineParent', {
                templateUrl: 'templates/section1/inline-view.html'
            })
            .within()
                .segment('inlineChildren', {
                    // no template here
                    controller: 'SlowDataCtrl',
                    resolve: {
                        data: function($timeout) {
                            return $timeout(function() { return 'SLOW DATA CONTENT'; }, 2000);
                        }
                    },
                    untilResolved: {
                        templateUrl: 'templates/loading.html'
                    }
                })
                .up()

            .within('itemInfo')
                .segment('tabSlow', {
                    templateUrl: 'templates/section1/slow-data.html',
                    controller: 'SlowDataCtrl',
                    resolve: {
                        data: function($timeout) {
                            return $timeout(function() { return 'SLOW DATA CONTENT'; }, 2000);
                        }
                    },
                    untilResolved: {
                        templateUrl: 'templates/loading.html'
                    }
                })

                
        
        
    $routeProvider.otherwise({redirectTo: '/students'});
}) ;

app.value('loader', {show: false});

function MainCtrl($scope, $routeSegment, loader) {

    $scope.$routeSegment = $routeSegment;
    $scope.loader = loader;
}

function StudentsCtrl($scope, $routeSegment, Data) {
    
    //$scope.$routeSegment = $routeSegment;
    $scope.students = Data('students');
}

function StudentDetailsCtrl($scope, $routeSegment, Data) {

//    $scope.$routeSegment = $routeSegment;
    $scope.student = Data('students')[$routeSegment.$routeParams.id-1];
    $scope.collapse = function() {};
}

function Section2Ctrl($scope, $routeSegment) {

    $scope.$routeSegment = $routeSegment;
    $scope.test = { textValue: '' };
    $scope.items = [ 1,2,3,4,5,6,7,8,9 ];
}

function ErrorCtrl($scope, error) {
    $scope.error = error;
}

function SlowDataCtrl($scope, data, loader) {
    loader.show = false;
    $scope.data = data;
}

app.factory('Data', function ($resource)
{
    var loader = $resource('data/:name.json');
    var loadList = ['students', 'lectures'];
    var data = {};
    for (var i = 0; i < loadList.length; i++)
        data[loadList[i]] = loader.query({name: (loadList[i])});

    return function (key) {
        return data[key];
    }});