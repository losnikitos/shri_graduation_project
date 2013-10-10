var module = angular.module('shri.services', ['ngResource']);

module.factory('Data', function ($resource) {
    var loader = $resource('data/:name.json');
    var loadList = ['students', 'lectures'];
    var data = {};
    for (var i = 0; i < loadList.length; i++)
        data[loadList[i]] = loader.query({name: (loadList[i])});

    return function (key) {
        return data[key];
    };
});