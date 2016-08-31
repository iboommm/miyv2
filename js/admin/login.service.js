
app.service('loginService', function($http) {
    
    var m = this;
    
    m.username = "";
    m.password = "";
    m.date = "";
    m.status = false;
    
    m.loging = function(username,password,mode) {
        m.username = btoa(username);
        m.password = btoa(password);
        m.access = btoa(m.username+","+m.password+","+mode);
        m.sending();
    }
    
    m.sending = function() {
        var parameter = {type:"logging",access: m.access};
        var url = "core/logging";
        console.log(parameter);
        $http.post(url, parameter).
            success(function(data) {
//                console.log(data);
                if(data == 1) {
                    $("#loading").modal("hide");
                    m.status = true;
                    location.reload();
                    return true;
                }else {
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