function StudentsCtrl($scope, $http) {
    $http.get('data/students.json').success(function(data) {
        $scope.students = data;
    });
};

function StudentDetailsCtrl($scope, $routeParams) {
    $scope.studentID = $routeParams.studentID;
}

function CoursesCtrl($scope, $http) {};
function CourseDetailsCtrl($scope, $http) {};
