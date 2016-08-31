<?php
        
    if(!defined("CHK_ADMIN")) {
        exit("Access Denied");
    }

    /* Login Module */

    class Admin {
        
        private $key;
        
        public function checkAdmin() {
            if(isset($_SESSION['id'])) {
                $id = $_SESSION['id'];
                $database = new Database();
                $condition = "`id` = $id AND `group_id` = 1";
                $login = [
                    "table" => "member",
                    "condition" => "$condition"
                ];
        
                 $logging = $database->select($login);
                 $rows = $database->rows($logging);
                if($rows > 0) {
                    return true;
                }else {
                    return false;
                }
            }else {
                return false;
            }
            
        }

        
        
    }

    /* Login Module */