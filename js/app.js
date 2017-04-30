angular.module('miyv2', ['ui.router','oc.lazyLoad','ui-notification','ngStorage'])

    .config(function ($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider,NotificationProvider) {
      $urlRouterProvider.otherwise('/home');

        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'left',
            positionY: 'top'
        });

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
