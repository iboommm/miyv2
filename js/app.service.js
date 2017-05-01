angular.module('miyv2').service('appService',['$http','$q',function($http,$q){
    var self = this;


    var deferObject,serviceMethods = {
        //TODO your code here
        getToken : function(page,token){
            var params = {page: page,token:token};
            var promise = $http.post("api/token",params),
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
        getTitle : function(page,token){
            var params = {page: page,token:token};
            var promise = $http.post("api/title",params),
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
