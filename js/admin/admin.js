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
    
    admin.getBlogList = function(page) {
        admin.blogList = [];
        admin.connect = admin.adminService.getBlogList(page);
        admin.connect.then(
            function(respond) {
                if (respond) {
                    admin.blogList = respond.data;
                    admin.getTotalBlog(page);
                    
                    $("#table-mngblog").removeClass("hidden");
                    $(".page-control").removeClass("hidden");
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
    
    admin.editBlog = function(data) {
        admin.tmpBlog = admin.blogList[data];
        $('#editorMngBlog').trumbowyg('destroy');
        $('#editorMngBlog').trumbowyg({
        plugins: ['pasteimage'],
        btnsDef: {
            // Customizables dropdowns
            image: {
                dropdown: ['insertImage', 'upload', 'base64', 'noEmbed'],
                ico: 'insertImage'
            }
        },
        btns: [
            ['viewHTML'],
            ['undo', 'redo'],
            ['formatting'],
            'btnGrp-design', ['link'],
            ['image'],
            'btnGrp-justify',
            'btnGrp-lists', ['foreColor', 'backColor'],
            ['preformatted'],
            ['emoji'],
            ['horizontalRule'],
            ['fullscreen']
        ],
        });
        $('#editorMngBlog').trumbowyg('html',admin.tmpBlog['data']);
        $("#editBlog").modal('show');
    }
    
    admin.updateBlog = function() {
        admin.tmpBlog.data = $('#editorMngBlog').trumbowyg('html');
        admin.connect = adminService.updateBlog(admin.tmpBlog);
        admin.connect.then(
            function(respond) {
//               console.log(respond.data);
                admin.showAlert(respond.data);
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
        }else if(admin.modeRemove == "blog") { 
//            console.log(admin.tmpID);
            admin.result = adminService.removeBlog(admin.tmpID);
            admin.result.then(
                function(respond) {
                    admin.getPage(admin.current_page);
                    admin.getTotalBlog(); 
                    $("#popupRemove").modal("hide");
                }
            );
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
    
    
    admin.pagination = [];
    admin.total_blog = 0;
    admin.num_per_page = 10;
    admin.current_page = 1;
    admin.start = 0;
    admin.end = 0;
    admin.filtered = [];
    admin.maxPage = 1;
    admin.commentLength = 0;
    
    admin.getPage = function(page) {
        admin.current_page = page;
        admin.pagination = [];
        
        
        var i=0;
        for(i;i<(admin.total_blog/admin.num_per_page)+1;i++) {
            admin.pagination.push(i);
//            admin.maxPage = Math.floor((admin.total_comment/admin.num_per_page)+1);
        }

        
        if(admin.total_blog == 0) {
            admin.start = -1;
            admin.end = 0;
           
        }else {
            admin.start = (page * admin.num_per_page) - admin.num_per_page;
            admin.end = admin.start + admin.num_per_page;
        }

    }
            
    admin.nextPage = function() {
        if(admin.current_page == admin.maxPage) {
            return;
        }
        admin.getPage(admin.current_page+1);
        
    }
    
    admin.getTotalBlog = function(page) {
        admin.result = adminService.getTotalBlog();
        admin.result.then(
            function(respond) {
                admin.total_blog = respond.data;
//                console.log(admin.total_blog);
                if(admin.total_blog%admin.num_per_page != 0) {
                    admin.maxPage = Math.floor(admin.total_blog/admin.num_per_page)+1;
                }else {
                    admin.maxPage = Math.floor(admin.total_blog/admin.num_per_page);
                }                
                admin.getPage(page);
            }
        )
    }
    
    admin.prevPage = function() {
        if(admin.current_page == 1) {
            return;
        }
         admin.getPage(admin.current_page-1);
    }
    
    admin.pageActive = function(page) {
        if(page == admin.current_page) {
            return " active ";
        }
    }
    
    admin.filter = function(item) {
        var tmp = admin.current_page;
        if(item == 1 || item == admin.maxPage) {
            return;
        }
        if(item == tmp || item == tmp-1 || item == tmp+1) {
            return item;
        }
    }

}]);