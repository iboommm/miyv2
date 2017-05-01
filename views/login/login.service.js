angular.module('miyv2').service('loginService',['$http','$q',function($http,$q){
    var self = this;


    var deferObject,serviceMethods = {
        //TODO your code here
        login : function(data,token){
            var params = {data: data,token:token};
            var promise = $http.post("api/login",params),
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
