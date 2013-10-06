function StudentsCtrl($scope, $http) {
    $scope.students = window.students;
};

function StudentDetailsCtrl($scope, $routeParams) {
    $scope.studentID = $routeParams.studentID;
};

function CoursesCtrl($scope, $http) {};
function CourseDetailsCtrl($scope, $http) {};
