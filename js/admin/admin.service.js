
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
    
    admin.updateMember = function(data) {
        var parameter = {access : admin.utf8_to_b64("member,update," + admin.utf8_to_b64(data.username) +  "," + admin.utf8_to_b64(data.password) + "," + data.email + "," + data.group_id + "," + data.id)};
        var url = "core/save";
        return $http.post(url, parameter);
    }
    
    admin.banMember = function(user) {
        var parameter = {access : admin.utf8_to_b64('member,ban,' + user)};
        var url = "core/save";
        return $http.post(url, parameter);
    }
    
    admin.unBanMember = function(user) {
        var parameter = {access : admin.utf8_to_b64('member,unban,' + user)};
        var url = "core/save";
        return $http.post(url, parameter);
    }
    
    admin.getGroup = function() {
        var parameter = {access : btoa('group,0')};
        var url = "core/apijson";
        return $http.post(url, parameter);
    }
    
    admin.getMember = function(user) {
        var parameter = {access : admin.utf8_to_b64('member,'+ user)};
        var url = "core/apijson";
        return $http.post(url, parameter);
    }
    
    admin.getGroupBlog = function() {
        var parameter = {access : admin.utf8_to_b64('category,0')};
        var url = "core/apijson";
        return $http.post(url, parameter);
    }
    
    admin.getBlogList = function() {
        var parameter = {access : admin.utf8_to_b64('blog,0')};
        var url = "core/apijson";
        return $http.post(url, parameter);
    }
    
    admin.addMember = function(data) {
        var access = admin.utf8_to_b64("member,add," + admin.utf8_to_b64(data.username) + "," + admin.utf8_to_b64(data.password) + "," + data.email + "," + data.group);
        var parameter = {access : access};
        var url = "core/save";
        return $http.post(url, parameter);
    }
    
    admin.addBlog = function(data) {
        var title = data.title;
        var cat_by = data.cat_by;
        var detail = data.data;
        var parameter = {access : admin.utf8_to_b64('blog,add,' + title + "," + cat_by + "," + detail)};
        var url = "core/save";
        return $http.post(url, parameter);
    }
    
    admin.updateCategory = function(data,remove) {
        var url = "core/update";
        var tmp = [{access:"category",data,remove}];
//        console.log(tmp);
        return $http.post(url, tmp);
    }

    admin.utf8_to_b64 = function(str) {
        return window.btoa(unescape(encodeURIComponent( str )));
    }

    admin.b64_to_utf8 = function(str) {
        return decodeURIComponent(escape(window.atob( str )));
    }
});