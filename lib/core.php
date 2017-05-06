<?php

  if(!defined('CORE')){
    exit("Access denied");
  }
  require '../src/Medoo.php';

  use Medoo\Medoo;

class Core extends Medoo {
  public $database;

  public function __construct() {
    $this->database = new Medoo([
    // required
      'database_type' => 'mysql',
      'database_name' => 'miyv2',
      'server' => 'localhost',
      'username' => 'root',
      'password' => '',
      'charset' => 'utf8',
    ]);
  }

    public function logging_in($username,$password) {
      if ($this->database->has("account", [
      	"AND" => [
      		"username" => "$username",
      		"password" => md5(md5("$password"))
      	]
      ]))
      {
        $newSession = base64_encode(md5(strtotime("now")."|".md5($password)));
        $this->database->update("account",["key_login"=>$newSession],["username"=>$username]);
      	return json_encode(["status"=>"true","session"=>$newSession,"username"=> base64_encode($username)]);
      }
      else
      {
      	return "false";
      }

    }

    public function getToken($data,$token,$id) {
      $id = base64_decode($id);
      if ($this->database->has("account", ["AND" => [
            "username" => $id,
        		"key_login" => "$token"
        	]
        ])) {
        	return "TRUE";
        } else {
        	return "FALSE";
        }
    }

    public function getTitle($data,$token,$id) {
      $datas = $this->database->select("setting","*",["name"=> ["title","tag","caption"]]);
      return json_encode($datas);
    }

    public function getSetting($token,$id) {
      if($this->getToken("",$token,$id) == "TRUE") {
        $datas = $this->database->select("setting","*",["name" => ["title", "caption"]]);
        return json_encode($datas);
      }
    }

    public function getSEO($token,$id) {
      if($this->getToken("",$token,$id) == "TRUE") {
        $datas = $this->database->select("setting","*",["name" => ["tag", "state"]]);
        return json_encode($datas);
      }
    }

    public function getID($baseID) {
      $datas = $this->database->get("account",["id"],["username"=> base64_decode($baseID)]);
      return $datas["id"];
    }

    public function updateSetting($token,$id,$data) {
      $result = false;
      $arr = "";
      if($this->getToken("",$token,$id) == "TRUE") {
        foreach($data as $item) {
          $result = $this->database->update("setting", [
            	"value" => $item->value,
              "update_time" => date("Y-m-d H:i:s"),
              "update_by" => $this->getID($id)
            ], [
            	"id" => $item->id
            ]);
        }
      }
      return json_encode(["status"=>$result]);
      // return json_encode($this->getID($id));
    }
  }


// echo json_encode($core->logging_in("Admin","123"));





?>
