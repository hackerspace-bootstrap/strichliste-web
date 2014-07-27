module.exports.install = function(app) {
    app.controller('FooController', function ($scope) {
        $scope.title = 'Strichliste';
        $scope.catPath = 'img/cat.jpg';
    });
};