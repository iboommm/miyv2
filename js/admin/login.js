var app = angular.module("loginApp",[]);

app.controller("loginController",['$scope', 'loginService', function ($scope , loginService) {
    var login = this;
    login.username = "";
    login.password = "";
    
    this.loginService = loginService;
    
    angular.element(document).ready(function () {
            $("#errloging").hide();
    });
    
    
    login.send = function() {
        if(login.username == "" || login.password == "") {
            login.showAlert();
            return;
        }
        $("#loading").modal("show");        
        loginService.loging(login.username,login.password);
            console.log(loginService.status);
    }
    
    login.showAlert = function() {
        $("#errloging").show();
        setTimeout(function() {
            $("#errloging").hide();
        },2000);
    }

}]);