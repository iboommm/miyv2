angular.module("dataModule",[])
    .controller("studentData",[function() {
        var self = this;
        self.studentArray = [
            { id: "b56xxxxx","name" : "Somchai Wattanakulkit",email: "test00001@test.in.th",tel: "082-2321-3421",university: "Suranaree University of Technology",status : false },
            { id: "b56xxxxx","name" : "Somchai Wattanakulkit",email: "test00001@test.in.th",tel: "082-2321-3421",university: "Suranaree University of Technology",status : false },
            { id: "b56xxxxx","name" : "Somchai Wattanakulkit",email: "test00001@test.in.th",tel: "082-2321-3421",university: "Suranaree University of Technology",status : false },
            { id: "b56xxxxx","name" : "Somchai Wattanakulkit",email: "test00001@test.in.th",tel: "082-2321-3421",university: "Suranaree University of Technology",status : false },
            { id: "b56xxxxx","name" : "Somchai Wattanakulkit",email: "test00001@test.in.th",tel: "082-2321-3421",university: "Suranaree University of Technology",status : false },
            { id: "b56xxxxx","name" : "Somchai Wattanakulkit",email: "test00001@test.in.th",tel: "082-2321-3421",university: "Suranaree University of Technology",status : false },
            { id: "b56xxxxx","name" : "Somchai Wattanakulkit",email: "test00001@test.in.th",tel: "082-2321-3421",university: "Suranaree University of Technology",status : false },
            { id: "b56xxxxx","name" : "Somchai Wattanakulkit",email: "test00001@test.in.th",tel: "082-2321-3421",university: "Suranaree University of Technology",status : false }
            ];
        console.log("create student data");
    }
])
    .controller("itemData",[function() {
        var self = this;
        self.itemData = [
            {id:1,name: "Product 1",img: "img/a1.jpg"},
            {id:2,name: "Product 2",img: "img/a2.jpg"},
            {id:3,name: "Product 3",img: "img/a3.jpg"},
            {id:4,name: "Product 4",img: "img/a2.jpg"},
            {id:5,name: "Product 5",img: "img/a3.jpg"},
            {id:6,name: "Product 6",img: "img/a1.jpg"}
        ];
        self.limit = 3;
        console.log("create item data");
    }])
.controller("textRegister",[function() {
    var self = this;
    self.username = "Enter Username";
    self.password = "Enter Password";
    self.repassword = "Enter Password again!"
    self.submit = function() {
        console.log(self.user);
    }
}]);