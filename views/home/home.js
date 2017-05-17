angular.module('miyv2').controller('HomeController',['$scope','$state','$http','HomeService','$sessionStorage','Notification','appService',function($scope,$state,$http,HomeService,$sessionStorage,Notification,appService) {

  var self = this;
  var app = $scope;

  app.storage = $sessionStorage.$default({
    token:'',
    title:'Home',
    id:'',
    status:false
  });

  self.initial = function() {
    console.log("initial");
    var page = 'home';
    var token = {token_key :app.storage.token , id:app.storage.id};
    var promise = appService.getToken(page,token);
    var getTitle = appService.getTitle(page,token);
    getTitle.then(
      function(responds) {
        // console.log(responds.data);
        $.each(responds.data, function(key,value) {
          // console.log(value.name);
          if(value.name == "title") {
            app.storage.header = value.value;
            app.storage.title = page.capitalize() + " - " + value.value ;
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
        }

        app.storage.status = false;
        app.storage.token = "";
      }
    )
    promise.catch(
      function(responds) {
        console.log("---- Err ----");
      }
    )
  }

  app.go = function(page) {
    $state.go(page);
  }


  self.initial();

}]);
