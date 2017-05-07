angular.module('miyv2').controller('adminController',['$scope','$state','$http','adminService','$sessionStorage','Notification','appService',function($scope,$state,$http,adminService,$sessionStorage,Notification,appService) {

  const self = this;
  const app = $scope;

  app.mode = "setting";
  app.section = "general";
  app.status = [];

  app.modeMap = {
    "setting": {
      name:"Setting",
      icon:'cogs',
      url:'views/admin/admin-general.html'
    },
    "seo": {
      name:"SEO",
      icon:'globe',
      url:'views/admin/admin-seo.html'
    },
    "AccMgnt": {
      name:"Member Management",
      icon:'user',
      url:'views/admin/admin-mgnt-acc.html'
    },
    "AccStatus": {
      name:"Status User",
      icon:'group',
      url:'views/admin/admin-status-acc.html'
    },
    "AccAdd": {
      name:"Add User",
      icon:'plus-circle',
      url:'views/admin/admin-add-acc.html'
    },

  }

  app.storage = $sessionStorage.$default({
    token:'',
    title:'Admin',
    id:'',
    author:'',
    caption:'',
    keywords:'',
    status:false
  });

  self.initial = function() {
    const page = 'admin';
    // console.log(app.storage.title);
    const token = {token_key :app.storage.token , id:app.storage.id};
    const promise = appService.getToken(page,token);
    const getTitle = appService.getTitle(page,token);
    const getStatus = adminService.getStatus(page,token);
    getStatus.then(
      function(responds) {
        if(responds != "false")
          app.status = responds.data;
      }
    )
    getStatus.catch(
      function(responds) {
        console.log("---- Err ----");
      }
    )
    getTitle.then(
      function(responds) {
        // console.log(responds.data);
        if(responds.data == "FALSE") {
          app.storage.status = false;
          app.storage.token = "";
          $state.go('login');
        }
        // console.log("Title",responds.data);
        $.each(responds.data, function(key,value) {
          // console.log(value.name);
          if(value.name == "title") {
            app.storage.header = value.value;
            app.storage.title = app.modeMap[app.mode].name + " - Admin - " + app.storage.header ; + " - Admin - " + value.value ;
          }else {
            app.storage[value.name] = value.value;
          }

        });

      }
    )
    getTitle.catch(
      function(responds) {
        console.log("---- Err ----");
      }
    )

    // console.log(token);
    promise.then(
      function(responds) {
        // console.log(responds.data);
        if(responds.data == "FALSE") {
          app.storage.status = false;
          app.storage.token = "";
          $state.go('login');
        }
        app.load("account");
      }
    )
    promise.catch(
      function(responds) {
        console.log("---- Err ----");
      }
    )
  }

  app.username = "";
  app.password = "";

  app.changeMode = function(data) {
    app.mode = data;
    app.storage.title = app.modeMap[data].name + " - Admin - " + app.storage.header ;
    // console.log(app.storage.title);
    app[data].get();
  }

  app.tmp = undefined;

  app.setting = {
    title : "",
    caption: "",
    get:function() {
      const token = {token_key :app.storage.token , id:app.storage.id};
      const promise = adminService.getSetting(token);
      // console.log(token);
      promise.then(
        function(responds) {
          // console.log(responds.data);
          if(responds.data == "FALSE") {
            app.storage.status = false;
            app.storage.token = "";
            $state.go('login');
          }
          // console.log("responds.data" ,responds.data);
          $.each(responds.data, function(key,value) {
            // console.log(value.name);
            if(value.name == "title" || value.name == "caption") {
              app.setting[value.name] = value.value;
              // console.log("app.setting =>", app.setting);
            }
          });
          app.tmp = responds.data;
        }
      )
      promise.catch(
        function(responds) {
          console.log("---- Err ----");
        }
      )
    },
    update: function() {
      const token = {token_key :app.storage.token , id:app.storage.id};
      const data = app.tmp;
      $.each(data, function(key,value) {
        if(value.name == "title" || value.name == "caption") {
          value.value = app.setting[value.name];
        }
      });
      const promise = adminService.updateSetting(data,token);

      promise.then(
        function(responds) {
          // console.log("responds.data" ,responds.data);
          if(responds.data == "FALSE") {
            app.storage.status = false;
            app.storage.token = "";
            $state.go('login');
          }else if(responds.data.status == 1) {
            Notification.success("Update Complete");
          }else {
            Notification.error("Update Error");
          }


        }
      )
      promise.catch(
        function(responds) {
          console.log("---- Err ----");
        }
      )
    }
  }

  app.seo = {
    tag : "",
    state: "",
    get:function() {
      const token = {token_key :app.storage.token , id:app.storage.id};
      const promise = adminService.getSEO(token);
      // console.log(token);
      promise.then(
        function(responds) {
          // console.log(responds.data);
          if(responds.data == "FALSE") {
            app.storage.status = false;
            app.storage.token = "";
            $state.go('login');
          }
          // console.log("responds.data" ,responds.data);
          $.each(responds.data, function(key,value) {
            // console.log(value.name);
              app.seo[value.name] = value.value;
              // console.log("app.setting =>", app.setting);
          });
          app.tmp = responds.data;
        }
      )
      promise.catch(
        function(responds) {
          console.log("---- Err ----");
        }
      )
    },
    update: function() {
      const token = {token_key :app.storage.token , id:app.storage.id};
      const data = app.tmp;
      $.each(data, function(key,value) {
        if(value.name == "title" || value.name == "caption") {
          value.value = app.setting[value.name];
        }
      });
      const promise = adminService.updateSEO(data,token);

      promise.then(
        function(responds) {
          // console.log("responds.data" ,responds.data);
          if(responds.data == "FALSE") {
            app.storage.status = false;
            app.storage.token = "";
            $state.go('login');
          }else if(responds.data.status == 1) {
            Notification.success("Update Complete");
          }else {
            Notification.error("Update Error");
          }


        }
      )
      promise.catch(
        function(responds) {
          console.log("---- Err ----");
        }
      )
    }
  }

  app.AccMgnt = {
    user : [],
    find: "",
    get:function() {
      const token = {token_key :app.storage.token,id:app.storage.id};
      const find = app.AccMgnt.find;
      const promise = adminService.getMember(token,find);
      // console.log(token);
      promise.then(
        function(responds) {
          // console.log(responds.data);
          if(responds.data == "FALSE") {
            app.storage.status = false;
            app.storage.token = "";
            $state.go('login');
          }
          app.AccMgnt.find = "";
          // console.log("Member => ", responds.data);
          if(responds.data != "null") {
            app.AccMgnt.user = responds.data;
          }

        }
      )
      promise.catch(
        function(responds) {
          console.log("---- Err ----");
        }
      )
    },
    update: function() {
      const token = {token_key :app.storage.token , id:app.storage.id};
      const data = app.tmp;
      $.each(data, function(key,value) {
        if(value.name == "title" || value.name == "caption") {
          value.value = app.setting[value.name];
        }
      });
      const promise = adminService.updateSetting(data,token);

      promise.then(
        function(responds) {
          // console.("responds.data" ,responds.data);
          if(responds.data == "FALSE") {
            app.storage.status = false;
            app.storage.token = "";
            $state.go('in');
          }else if(responds.data.status == 1) {
            Notification.success("Update Complete");
          }else {
            Notification.error("Update Error");
          }


        }
      )
      promise.catch(
        function(responds) {
          console.log("---- Err ----");
        }
      )
    }
  }

  app.AccAdd = {
    tmp: {
      username:"",
      password:"",
      repassword:"",
      bio:"",
      email:"",
      status:2
    },
    add:function() {
      const token = {token_key :app.storage.token , id:app.storage.id};
      const data = app.AccAdd.tmp;

      if(!(data.password == data.repassword)) {
        Notification.error("Password isn't match");
        return 0;
      }else {
        const promise = adminService.addMember(data,token);
        promise.then(
          function(responds) {
            console.log("responds.data" ,responds.data);
            if(responds.data == "FALSE") {
              app.storage.status = false;
              app.storage.token = "";
              $state.go('in');
            }else if(responds.data.status == 1) {
              Notification.success("Add Complete");
              app.AccAdd.tmp= {
                username:"",
                password:"",
                repassword:"",
                bio:"",
                email:"",
                status:2
              }
            }else {
              Notification.error("Add Error");
            }


          }
        )
        promise.catch(
          function(responds) {
            console.log("---- Err ----");
          }
        )
      }
    },
    get:function() {
      return 0;
    },
    update: function() {
      const token = {token_key :app.storage.token , id:app.storage.id};
      const data = app.tmp;
      $.each(data, function(key,value) {
        if(value.name == "title" || value.name == "caption") {
          value.value = app.setting[value.name];
        }
      });
      const promise = adminService.updateSetting(data,token);

      promise.then(
        function(responds) {
          // console.("responds.data" ,responds.data);
          if(responds.data == "FALSE") {
            app.storage.status = false;
            app.storage.token = "";
            $state.go('in');
          }else if(responds.data.status == 1) {
            Notification.success("Update Complete");
          }else {
            Notification.error("Update Error");
          }


        }
      )
      promise.catch(
        function(responds) {
          console.log("---- Err ----");
        }
      )
    }
  }

  app.AccStatus = {
    get:function() {
      return 0;
    },
    update: function() {
      const token = {token_key :app.storage.token , id:app.storage.id};
      const data = app.status;
      app.status = [];
      const promise = adminService.updateStatus(data,token);

      promise.then(
        function(responds) {
          console.log("responds.data" ,responds.data);
          if(responds.data == "FALSE") {
            app.storage.status = false;
            app.storage.token = "";
            $state.go('in');
          }else if(responds.data.status == 1) {
            Notification.success("Update Complete");
            const getStatus = adminService.getStatus("page",token);
            getStatus.then(
              function(responds) {
                if(responds != "false")
                  app.status = responds.data;
              }
            )
            getStatus.catch(
              function(responds) {
                console.log("---- Err ----");
              }
            )
          }else {
            Notification.error("Update Error");
          }


        }
      )
      promise.catch(
        function(responds) {
          console.log("---- Err ----");
        }
      )
    }
  }

  app.logout = function() {
    app.storage.status = false;
  }

  app.go = function(page) {
    $state.go(page);
  }

  app.getStatus = function(id) {
    // console.log(app.status[id-1]);
    return "<i class='fa fa-" + app.status[id-1].icon + " ' ></i> " + app.status[id-1].name;
  }

  app.load = function(data) {
    app.section = data;
    if(data == "account") {
      app.changeMode('AccStatus');
    }else if(data == "general") {
      app.changeMode('setting');
    }
    // console.log(app.section);
  }

  self.initial();

}]);
