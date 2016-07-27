var app = angular.module("loginApp",[]).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
 });;

app.controller("loginController",function() {
    var login = this;
    login.username = "";
    login.password = "";
    login.checkLogin = function() {
        var username = login.username;
        var password = login.password;
    };
    
    login.back = function() {
        console.log("back");
    }
});