
app.service('adminService', function($http) {
    var admin = this;
    admin.getSetting = function() {
        var parameter = {access : btoa('setting,0')};
        var url = "core/apijson";
        return $http.post(url, parameter);
    }
    
    admin.updateSetting = function(data) {
        var parameter = {access : admin.utf8_to_b64("setting," + data.title +  "," + admin.utf8_to_b64(data.tag) + "," + data.switch)};
        var url = "core/save";
        return $http.post(url, parameter);
    }
    admin.utf8_to_b64 = function(str) {
        return window.btoa(unescape(encodeURIComponent( str )));
    }

    admin.b64_to_utf8 = function(str) {
        return decodeURIComponent(escape(window.atob( str )));
    }
});