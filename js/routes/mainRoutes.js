define(['modules/mainApp' , 'controllers/listCtrl'] , function (mainApp) {
    return mainApp.config(['$routeProvider' , function ($routeProvider) {
        $routeProvider.when('/' , {controller: 'listCtrl' , templateUrl: '/templates/List.html'});
    }]);

});