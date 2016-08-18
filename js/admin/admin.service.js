
app.service('adminService', function($http) {
    var admin = this;
    admin.getSetting = function() {
        var parameter = {access : btoa('setting,0')};
        var url = "core/apijson";
        return $http.post(url, parameter);
    }
    
    admin.updateSetting = function(data) {
        var parameter = {access : btoa("setting," + data.title +  "," + data.tag + "," + data.switch)};
        var url = "core/save";
        return $http.post(url, parameter);
    }
});