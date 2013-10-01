require(["lib/angular.min"], function(angular) {
    alert("это выполнится только тогда, когда файл angular.js будет загружен");
});



define( "angular", ['jQuery'],
    function( jQuery ){

        function StudentsCtrl($scope) {

//    var jsonPath = "../data/students.json";
//    $.getJSON(jsonPath, function (data) {
//        $scope.students = data;
//    });
            $scope.students = [
                {first_name: 'Никита', last_name: 'Попов'},
                {first_name: 'Василий', last_name: 'Теркин'}
            ]
        }

    }
);

//require.config({
//    baseUrl: 'js/lib',
//    paths: {
//        jquery: 'jquery-2.0.3.min',
//        angular: 'angular.min',
//        bootstrap: 'bootstrap.min'
//    }
//});
//
//requirejs(["main"]);





require.config({
    baseUrl: 'js/lib',
    paths: {
        'jQuery': 'jquery-2.0.3',
        'angular': 'angular',
//        'angular-resource': '//ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular-resource'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
//        'angular-resource': { deps:['angular']},
        'jQuery': {'exports' : 'jQuery'}
    }
});

require(['jQuery', 'angular', 'routes/mainRoutes'] , function ($, angular, mainRoutes) {
    $(function () { // using jQuery because it will run this even if DOM load already happened
        angular.bootstrap(document , ['mainApp']);
    });
});