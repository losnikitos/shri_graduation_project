app.directive('person', function () {
        return {
            restrict: 'E',
            templateUrl: 'parts/personCompact.html',
            replace: true
        };
    });

app.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
});