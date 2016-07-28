var app = angular.module("loginApp",[]);

app.controller("loginController",['$scope', 'loginService', function ($scope , loginService) {
    var login = this;
    login.username = "";
    login.password = "";
    

}]);