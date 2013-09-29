function StudentsCtrl($scope) {
    var jsonPath = "../data/students.json";

    $.getJSON(jsonPath, function (data) {
        $scope.students = data;
    });

//    $scope.students = [
//        {first_name: 'Никита', last_name: 'Попов'},
//        {first_name: 'Василий', last_name: 'Теркин'}
//    ]
}