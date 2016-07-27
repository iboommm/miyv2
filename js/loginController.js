angular.module("loginController",[])
    .controller("test",[function() {
        var self = this;
        self.testClick = function() {
            console.log(self.user);
        }
    }]);