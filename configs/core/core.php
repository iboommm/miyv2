<?php
session_start();

if(!defined("CORE_MIY")) {
    exit("Access Denied");
}

require_once 'database.php';
require_once 'thaidate.php';


class Core {
    private $keyLog;
    
    private function createKeyLog() {
        $_SESSION['key-log'] = rand(1000000,9999999);;
        $_SESSION['error'] = 0;
        $this->keyLog = $_SESSION['key-log'];
    }
    
    public function getKeyLog($key) {
        if($_SESSION['key-log'] == $key ) {
              return $keyLog;
        }
    }
    
    public function checkKeyLog() {
        if(isset($_SESSION['key-log']) == false || $_SESSION['key-log'] == "") {
            $this->createKeyLog();
            return true;
        } else {
            false;
        }
    }
    
    public function logging($access) {
        $accept = base64_decode($access);
        $data = explode(",",$accept);
        $username = base64_decode($data[0]);
        $password = md5(base64_decode($data[1]));
        $mode = $data[2];
        if($mode == "admin") {
            $condition = " `username` LIKE '".$username."' AND `password` LIKE '".$password."' AND `group_id` = 1";
        }else {
            $condition = " `username` LIKE '".$username."' AND `password` LIKE '".$password."'";
        }
        $database = new Database();
        $login = [
            "table" => "member",
            "condition" => "$condition"
        ];
        
        $logging = $database->select($login);
        $result = $database->rows($logging);
        
        if($result == 1) {
            $user = $database->get($logging);
            $_SESSION['user'] = $user['username'];
            $key = $_SESSION['key-log'];
            $_SESSION['id'] = $id = $user['id'];
            $ar['sesLogin'] = $key;
            $_SESSION['log'] = $ar['log'] = session_id();
            $setUpdate = $database->update("member",$ar,"`id` = $id;");
            return true;
//            $sql = "UPDATE `member` SET `sesLogin` = '$key' WHERE `member`.`id` = $id;";
//            $updateSession = $database->query($sql);
        }else {
            return false;
        }
        
    }
    
    public function checkLogSession() {
        if(isset($_SESSION['key-log'])) {
            $database = new Database();
            $id = $_SESSION['id'];
            $sql = "SELECT `id`, `sesLogin` FROM `member` WHERE `id` = $id";
            $query = $database->query($sql);
            $data = $database->get($query);
            if($data['sesLogin'] == $_SESSION['key-log']) {
                return true;
            }else {
                return false;
            }
        }else {
            return false;
        }
    }
    
    public function memberCheckPassword($id,$oldpassword) {
        $sql = "SELECT `id`, `password` FROM `member` WHERE `id` = $id AND `password` LIKE '$oldpassword'";
        $database = new Database();
        $query = $database->query($sql);
        return $database->rows($query);
        
    }
    
}




