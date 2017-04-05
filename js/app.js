angular.module('miyv2', ['ui.router','oc.lazyLoad'])

    .config(function ($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
      $urlRouterProvider.otherwise('/home');
      $stateProvider
      .state('home', {
            url: "/home",
            views: {
              "content": {
                controller: 'HomeController',
                controllerAs: 'homeController',
                templateUrl: 'views/home/home.html'
              }
            },
            resolve: {
              loadController: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('views/home/home.js');
              }]
                ,loadService: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('views/home/home.service.js');
              }]
            }
        })
        .state('login', {
              url: "/login",
              views: {
                "content": {
                  controller: 'LoginController',
                  controllerAs: 'loginController',
                  templateUrl: 'views/login/login.html'
                }
              },
              resolve: {
                loadController: ['$ocLazyLoad', function($ocLazyLoad) {
                  return $ocLazyLoad.load('views/login/login.js');
                }]
                  ,loadService: ['$ocLazyLoad', function($ocLazyLoad) {
                  return $ocLazyLoad.load('views/login/login.service.js');
                }]
              }
          })
    }) 
