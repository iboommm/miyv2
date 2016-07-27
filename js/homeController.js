angular.module("homeController",['ngSanitize'])
    .controller("txtHeader",[function() {
        var self = this;
        self.lang = 
            {
                home: "Home",
                contactus: "Contact Us",
                signin : "Sign in...",
                register : "Register",
                memberzone : "Member Zone",
                username : "Username",
                password : "Password",
                remember : "Remember",
                forgotpassword : "Forgot password"
            };
    }])
    .controller("brandLoader",[function() {
        var self = this;
        self.data = {name : "TEST123"};
    }])
    .controller("moduleLoader",[function() {
        var self = this;
        self.mod1 = {
            name: "Module 1",
            data: "Data in Module 1 &amp; I wanna say to my MIY"
        };
        self.mod2 = {
            name: "Module 2",
            data: "<div align='center'><p>&nbsp;</p><p style='text-align: center; font-size: 15px;'><img src='https://www.tinymce.com/images/glyph-tinymce@2x.png' alt='TinyMCE' width='110' height='97' /></p></div><p style='text-align: center; color: #7e7e7e; font-size: 15px; font-family: avenir; font-weight: 200;'>TinyMCE is a platform independent web-based JavaScript HTML WYSIWYG<br /> editor control released as open source under LGPL.</p><p style='text-align: center; color: #868686; font-size: 15px; font-family: avenir; font-weight: 200;'><em>TinyMCE enables you to convert HTML textarea fields or other HTML elements to editor instances.</em></p><p>&nbsp;</p>"
        };
        self.mod3 = {
            name: "Module 3",
            data: "<div align='center'><img src='https://s1.wp.com/wp-content/themes/h4/landing/marketing/img/features_mobile_circle.svg' /></div><br><h3>Easy to use</h3><br>Easy to use<br>Creating and managing your website is simple with WordPress.com’s powerful platform. Get started in minutes and make changes to your site easily."
        };
        self.mod4 = {
            name: "Search",
            data: "<input type='button' value='123' />"
        };
    }]);
