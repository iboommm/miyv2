var app = angular.module("test",[]);
        app.controller("sidebar-xs",function($scope)  {
            $scope.control = 0;
            $scope.sideLeft = function() {
                if($scope.control == 0) {
                    var d = document.getElementById('sideLeft');
                    d.style.display = "block";
                    d.style.left = "0px";
                    d.style.transition = "all ease-in 0.2s";
                    var c = document.getElementById('content');
                    c.style.display = "none";
                    $scope.control = -1;                    
                }else if($scope.control == 1) {
                    var d = document.getElementById('sideRight');
                    d.style.display = "none";
                    d.style.transition = "all ease-in 0.2s";
                    $scope.control = 0;
                    var c = document.getElementById('content');
                    c.style.animation = "contentRightToCenter 0.2s linear 0s";
                    c.style.left = "0px;";
                    c.style.display = "block";
                }
            };
            $scope.sideRight = function() {
                if($scope.control == 0) {
                    var d = document.getElementById('sideRight');
                    d.style.display = "block";
                    d.style.left = "0px";
                    d.style.transition = "all ease-in 0.2s";
                    var c = document.getElementById('content');
                    c.style.display = "none";
                    $scope.control = 1;
                }else if($scope.control == -1) {
                    var d = document.getElementById('sideLeft');
                    d.style.display = "none";
                    d.style.transition = "all ease-in 0.2s";
                    $scope.control = 0;
                    var c = document.getElementById('content');
                    c.style.animation = "contentLeftToCenter 0.2s linear 0s";
                    c.style.left = "0px;";
                    c.style.display = "block";
                }
            };
        });