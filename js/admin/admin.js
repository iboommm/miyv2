var app = angular.module("adminApp",[]);

app.controller("adminController",['$scope', 'adminService', function ($scope , adminService) {
    
    var admin = this;
    
    admin.adminService = adminService;
    
    admin.title = "";
    admin.tag = "";
    admin.switch = "1";
    
    admin.tmp = [];

    admin.show = function() {
        admin.connect = admin.adminService.getSetting();
        admin.connect.then (
            function(respond) {
                if(respond) {
                    admin.title = respond.data.title;
                    admin.tag = respond.data.tag;
                    admin.switch = respond.data.switch;
                }
            }
        )
        
    }
    
    admin.update = function() {
        admin.ar = {
            'title': admin.title,
            'tag' : admin.tag,
            'switch': admin.switch
        };
        //console.log(admin.ar;
        admin.result = adminService.updateSetting(admin.ar);
        admin.result.then(
            function(respond) {
                if(respond) {
                    console.log(respond.data);
                }
            }
        )
    }
    
    angular.element(document).ready(function () {
       admin.show();
    });
    
    
    
}]);