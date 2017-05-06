angular.module('miyv2').service('adminService',['$http','$q',function($http,$q){
    var self = this;


    var deferObject,serviceMethods = {
        //TODO your code here
        getSetting : function(token){
            var params = {token:token};
            var promise = $http.post("api/setting",params),
                deferObject = deferObject || $q.defer();

            promise.then(
                function(answer){
                    deferObject.resolve(answer);
                },
                function(reason){
                    deferObject.reject(reason);
                }
            );
            return deferObject.promise;

        },
        getSEO : function(token){
            var params = {token:token};
            var promise = $http.post("api/seo",params),
                deferObject = deferObject || $q.defer();

            promise.then(
                function(answer){
                    deferObject.resolve(answer);
                },
                function(reason){
                    deferObject.reject(reason);
                }
            );
            return deferObject.promise;

        },
        updateSetting : function(data,token){
            var params = {token:token,data};
            // console.log("params =>", params);
            var promise = $http.post("api/setting",params),
                deferObject = deferObject || $q.defer();

            promise.then(
                function(answer){
                    deferObject.resolve(answer);
                },
                function(reason){
                    deferObject.reject(reason);
                }
            );
            return deferObject.promise;

        },
        getMember : function(token,find){
            var params = {token,find};
            // console.log("params =>", params);
            var promise = $http.post("api/member",params),
                deferObject = deferObject || $q.defer();

            promise.then(
                function(answer){
                    deferObject.resolve(answer);
                },
                function(reason){
                    deferObject.reject(reason);
                }
            );
            return deferObject.promise;

        },
        addMember: function(data,token){
            var params = {token,data};
            // console.log("params =>", params);
            var promise = $http.post("api/member",params),
                deferObject = deferObject || $q.defer();

            promise.then(
                function(answer){
                    deferObject.resolve(answer);
                },
                function(reason){
                    deferObject.reject(reason);
                }
            );
            return deferObject.promise;

        },
        getStatus: function(data,token){
            var params = {token,data};
            // console.log("params =>", params);
            var promise = $http.post("api/status",params),
                deferObject = deferObject || $q.defer();

            promise.then(
                function(answer){
                    deferObject.resolve(answer);
                },
                function(reason){
                    deferObject.reject(reason);
                }
            );
            return deferObject.promise;

        },


    };
    return serviceMethods;
    }]);
