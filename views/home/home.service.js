angular.module('miyv2').service('HomeService',['$http','$q',function($http,$q){
    var self = this;


    var deferObject,serviceMethods = {
        //TODO your code here
        getToken : function(){
           var params = {page: "admin"};
            var promise = $http.get("api/token/get",params),
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
