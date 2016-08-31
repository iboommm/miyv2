var app = angular.module("adminApp", []);

app.controller("adminController", ['$scope', 'adminService', function($scope, adminService) {

    angular.element(document).ready(function() {
        $(".alert-danger").hide();
        $(".alert-success").hide();
    });

    var admin = this;

    admin.adminService = adminService;

    admin.title = "";
    admin.tag = "";
    admin.switch = "1";
    admin.group = [];
    admin.tmp = [];
    admin.memberSearch = [];
    admin.search = "";
    admin.category = [];
    admin.tmpCategory = "";
    admin.tmpRemove = [];
    admin.tmpID = "";
    admin.banSatus = false;
    admin.tmpBlog = {title:"",cat_by:"1",data:""};
    
    admin.show = function() {
        admin.connect = admin.adminService.getSetting();
        admin.connect.then(
            function(respond) {
                if (respond) {
                    admin.title = respond.data[0].title;
                    admin.tag = respond.data[0].tag;
                    admin.switch = respond.data[0].switch;
                }
            }
        )
    }

    
    admin.getCategory = function() {
        admin.category = [];
        admin.connect = admin.adminService.getGroupBlog();
        admin.connect.then(
            function(respond) {
                if (respond) {
                    admin.category = respond.data;
                    $("#table-category").removeClass("hidden");
                }
            }
        )
    }
    
    admin.getBlogList = function() {
        admin.blogList = [];
        admin.connect = admin.adminService.getBlogList();
        admin.connect.then(
            function(respond) {
                if (respond) {
                    admin.blogList = respond.data;
                    $("#table-mngblog").removeClass("hidden");
                }
            }
        )
    }
    
    admin.updateCategory = function() {
        admin.connect = admin.adminService.updateCategory(admin.category,admin.tmpRemove);
        $("#table-category").addClass("hidden");
        admin.connect.then(
            function(respond) {
               $("#table-category").removeClass("hidden");
               //console.log(respond.data);
            }
        )
    }
    
    admin.addBlog = function() {
        
        admin.tmpBlog.data = $('#editorAddBlog').trumbowyg('html');
        admin.connect = adminService.addBlog(admin.tmpBlog);
        admin.connect.then(
            function(respond) {
//               console.log(respond.data);
                admin.showAlert(respond.data);
                if(respond.data == 1) {
                    admin.tmpBlog = {title:"",cat_by:"1",data:""};
                    $('#editorAddBlog').trumbowyg('html','');
                }
            }
        )
    }
    
    admin.removeCategory = function(data) {
        //console.log(admin.category[data].id);
        if(admin.category[data].id != null) {
            admin.tmpRemove.push(admin.category[data].id);    
        }
        admin.category.splice(data,1);
        admin.tmpID = "";
        admin.tmpRemove = admin.tmpRemove.sort();
//        console.log(admin.tmpRemove);
    }
    
    admin.getGroup = function() {
        admin.groupConnect = admin.adminService.getGroup();
        admin.groupConnect.then(
            function(respond) {
                if (respond) {
                   admin.group = respond.data;
                }
            }
        )
    }
    
    admin.confirmRemove = function() {
//        console.log(admin.modeRemove);
        if(admin.modeRemove == "cate") {
            admin.removeCategory(admin.tmpID);
            $("#popupRemove").modal("hide");
        }else {
            return;
        }
    }
    
    admin.hideCategory = function(data) {
        admin.category[data].status = 0;
    }
    
    admin.showCategory = function(data) {
        admin.category[data].status = 1;
    }
    
    admin.showPopupRemove = function(data,mode) {
        $("#popupRemove").modal("show");
        admin.modeRemove = mode;
        admin.tmpID = data;
    }
    
    admin.editMember = function(data) {
        $("#manageMember").modal("show");
        admin.tmpMember = admin.memberSearch[data];
    }
    
    admin.resetState = function() {
        admin.memberSearch = [];
        admin.search = "";
        admin.tmpMember = {username:"",password:"",email:"",group:"0"};
    }
    
    admin.getMember = function() {
        var user = admin.search;
        admin.memberSearch = [];
        admin.search = "";
        admin.groupConnect = admin.adminService.getMember(user);
        admin.groupConnect.then(
            function(respond) {
                if (respond.data.length > 0) {
                   admin.memberSearch = respond.data;
                    if(admin.memberSearch[0].group_id == 4) {
                        admin.banSatus = true;
                    }else {
                        admin.banSatus = false;
                    }
                }else {
                    admin.showAlert(0);
                }
            }
        )
    }
    
    admin.addCategory = function() {
        admin.category.push({name:"",status:1});
    }

    
    admin.update = function() {
        admin.ar = {
            'title': admin.title,
            'tag': admin.tag,
            'switch': admin.switch
        };
        //console.log(admin.ar;
        admin.result = adminService.updateSetting(admin.ar);
        admin.result.then(
            function(respond) {
                admin.showAlert(respond.data);
//                console.log(respond.data);
            }
        )
    }

    admin.showAlert = function(data) {
        if (data == 1) {
            $(".alert-success").show();
            setTimeout(function() {
                $(".alert-success").hide();
            }, 2000);
        } else {
            $(".alert-danger").show();
            setTimeout(function() {
                $(".alert-danger").hide();
            }, 2000); 
        }
        
    }
    
    admin.banMember = function(user) {
        admin.result = adminService.banMember(user);
        admin.result.then(
            function(respond) {
                admin.banSatus = true;
            }
        )
    }
    
    admin.unBanMember = function(user) {
        admin.result = adminService.unBanMember(user);
        admin.result.then(
            function(respond) {
                admin.banSatus = false;
            }
        )
    }

    
    admin.updateMember = function() {
        admin.result = adminService.updateMember(admin.tmpMember);
        admin.result.then(
            function(respond) {
                admin.showAlert(respond.data);
            }
        )
    }
    
    admin.tmpMember = {username:"",password:"",email:"",group:"0"};
    admin.addMember = function() {
        if(admin.tmpMember.username == "" || admin.tmpMember.password == "" || admin.tmpMember.email == "" || admin.tmpMember.group == 0) {
            admin.showAlert(0);
        }else {
            admin.addMemberService =  adminService.addMember(admin.tmpMember);
            admin.addMemberService.then(
                function(respond) {
                    admin.showAlert(respond.data);
                }
            )
            admin.tmpMember = {username:"",password:"",email:"",group:"0"};
        }
    }

}]);