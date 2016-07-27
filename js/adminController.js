angular.module("adminController", ['ngDragDrop'])
    .controller("txtHeader",[function() {
        var self = this;
        self.lang = 
            {
                home: "Home",
                general: "General",
                member: "Member",
                module: "Modules",
                plugin: "Plugins",
                signout: "Sign out"
            };
    }])
    .controller("brandLoader",[function() {
        var self = this;
        self.data = {name : "TEST123"};
    }])
    .controller("memberSearch",[function() {
        var self = this;
        self.limit = 3;
        self.member = [
            {id: 1,username: "admin",email: "test@test.in.th"},
            {id: 2,username: "test01",email: "test@test.in.th"},
            {id: 3,username: "test02",email: "test@test.in.th"},
            {id: 4,username: "test03",email: "test@test.in.th"},
            {id: 5,username: "test04",email: "test@test.in.th"},
            {id: 6,username: "test05",email: "test@test.in.th"},
            {id: 7,username: "test06",email: "test@test.in.th"}
        ]
    }])
.controller('oneCtrl', function($scope, $timeout) {
        $scope.list1 = [];
        $scope.list2 = [];
        $scope.list3 = [];
        $scope.list4 = [];
        $scope.list5 = [];
        
        $scope.list0 = [
          { 'title': 'Item 1', 'drag': true },
          { 'title': 'Item 2', 'drag': true },
          { 'title': 'Item 3', 'drag': true },
          { 'title': 'Item 4', 'drag': true },
          { 'title': 'Item 5', 'drag': true },
          { 'title': 'Item 6', 'drag': true },
          { 'title': 'Item 7', 'drag': true },
          { 'title': 'Item 8', 'drag': true }
        ];

        // Limit items to be dropped in list1
        /*$scope.optionsList1 = {
          accept: function(dragEl) {
            if ($scope.list1.length >= 99) {
              return false;
            } else {
              return true;
            }
          }
        };*/
      });
;