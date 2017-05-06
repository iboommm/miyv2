angular.module('miyv2').controller('adminController',['$scope','$state','$http','adminService','$sessionStorage','Notification','appService',function($scope,$state,$http,adminService,$sessionStorage,Notification,appService) {

  var self = this;
  var app = $scope;

  app.mode = "setting";

  app.modeMap = {
    "setting": {
      name:"Setting",
      icon:'cogs',
      url:'views/admin/admin-general.html'
    },
    "seo": {
      name:"Setting",
      icon:'cogs',
      url:'views/admin/admin-seo.html'
    }
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

  app.test = "";

  app.username = "";
  app.password = "";

  app.changeMode = function(data) {
    app.mode = data;
    app.storage.title = data.capitalize() + " - Admin - " + app.storage.header ;
    console.log(data);
    app[data].get();
  }

  app.tmp = undefined;

  app.setting = {
    title : "",
    caption: "",
    get:function() {
      var token = {token_key :app.storage.token , id:app.storage.id};
      var promise = adminService.getSetting(token);
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
      var token = {token_key :app.storage.token , id:app.storage.id};
      var data = app.tmp;
      $.each(data, function(key,value) {
        if(value.name == "title" || value.name == "caption") {
          value.value = app.setting[value.name];
        }
      });
      var promise = adminService.updateSetting(data,token);

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
      var token = {token_key :app.storage.token , id:app.storage.id};
      var promise = adminService.getSEO(token);
      // console.log(token);
      promise.then(
        function(responds) {
          // console.log(responds.data);
          if(responds.data == "FALSE") {
            app.storage.status = false;
            app.storage.token = "";
            $state.go('login');
          }
          console.log("responds.data" ,responds.data);
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
      var token = {token_key :app.storage.token , id:app.storage.id};
      var data = app.tmp;
      $.each(data, function(key,value) {
        if(value.name == "title" || value.name == "caption") {
          value.value = app.setting[value.name];
        }
      });
      var promise = adminService.updateSEO(data,token);

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

  app.showUsername = function() {
    console.log(app.username);
  }

  app.logout = function() {
    app.storage.status = false;
  }

  self.initial = function() {



    var page = 'admin';
    console.log(app.storage.title);
    var token = {token_key :app.storage.token , id:app.storage.id};
    var promise = appService.getToken(page,token);
    var getTitle = appService.getTitle(page,token);
    getTitle.then(
      function(responds) {
        // console.log(responds.data);
        if(responds.data == "FALSE") {
          app.storage.status = false;
          app.storage.token = "";
          $state.go('login');
        }
        console.log("Title",responds.data);
        $.each(responds.data, function(key,value) {
          // console.log(value.name);
          if(value.name == "title") {
            app.storage.header = value.value;
            app.storage.title = app.mode.capitalize() + " - Admin - " + value.value ;
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
        app.setting.get();
      }
    )
    promise.catch(
      function(responds) {
        console.log("---- Err ----");
      }
    )
  }

  app.login = function() {
    var data = {username:app.username,password:app.password};
    var token = app.storage.token;
    var promise = loginService.login(data,token);
    promise.then(
      function(responds) {
        var status = responds.data.status;
        if(status) {
          Notification.success('Login Success');
          $("#form-login").addClass("animated flipOutX");
          app.storage.status = true;
          app.storage.token = responds.data.session;
          app.storage.id = responds.data.username;
        }else {
          Notification.error('Username or Password is wrong!');
        }
      }
    )
    promise.catch(
      function(responds) {
        console.log("---- Err ----");
      }
    )
  }

  self.initial();

}]);
