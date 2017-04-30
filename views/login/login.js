angular.module('miyv2').controller('LoginController',['$scope','$state','$http','loginService','$sessionStorage','Notification','appService',function($scope,$state,$http,loginService,$sessionStorage,Notification,appService) {

  var self = this;
  var app = $scope;

  app.storage = $sessionStorage.$default({
    token:'',
    title:'',
    id:'',
    status:false
  });

  app.test = "";

  app.username = "";
  app.password = "";

  app.showUsername = function() {
    console.log(app.username);
  }

  app.logout = function() {
    app.storage.status = false;
  }

  self.initial = function() {

    var page = 'login';
    var token = {token_key :app.storage.token , id:app.storage.id};
    var promise = appService.getToken(page,token);
    // console.log(token);
    promise.then(
      function(responds) {
        // console.log(responds.data);
        if(responds.data == "FALSE") {
          app.storage.status = false;
          app.storage.token = "";
        }
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
