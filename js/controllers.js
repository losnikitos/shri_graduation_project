function StudentsCtrl($scope, $http) {
    $http.get('data/students.json').success(function(data) {
        $scope.students = data;
    });
};

function StudentDetailsCtrl($scope, $routeParams) {
    $scope.studentID = $routeParams.studentID;
};

function CoursesCtrl($scope, $http) {};
function CourseDetailsCtrl($scope, $http) {};






function EditStudentCtrl($scope, $location, $routeParams, Project) {
    var self = this;

    //Using studentID from URL. Ain't it RESTful?
    Student.get({id: $routeParams.studentId}, function(student) {
        self.original = student;
        $scope.student = new Student(self.original);
    });

    //To enable or disable 'Save' button
    $scope.isClean = function() {
        return angular.equals(self.original, $scope.student);
    }

    //For erasing a student
    $scope.destroy = function() {
        self.original.destroy(function() {
            $location.path('/list');
        });
    };

    $scope.save = function() {
        $scope.student.update(function() {
            $location.path('/');
        });
    };
}