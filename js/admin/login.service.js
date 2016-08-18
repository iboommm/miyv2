
app.service('loginService', function($http) {
    
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    
    var m = this;
    m.arr = [{name:"test1"},{name:"test2"},{name:"test3"}];
    
    m.username = "";
    m.password = "";
    m.date = "";
    m.status = false;
    
    m.loging = function(username,password) {
        m.username = btoa(username);
        m.password = btoa(password);
        m.date = new Date();
        m.access = btoa(m.username+","+m.password);
        m.sending();
    }
    
    m.sending = function() {
        var parameter = {type:"logging",access: m.access};
        var url = "core/logging";
        console.log(parameter);
        $http.post(url, parameter).
            success(function(data, status, headers, config) {
                if(data == 1) {
                    console.log("success");
                    $("#loading").modal("hide");
                    m.status = true;
                    location.reload();
                    return true;
                }else {
                    console.log("error");
                    $("#loading").modal("hide");
                    m.status = false;
                    m.showAlert();
                    return false;
                }
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
    }
    
    m.showAlert = function() {
        $("#errloging").show();
        setTimeout(function() {
            $("#errloging").hide();
        },2000);
    }

    
    
});