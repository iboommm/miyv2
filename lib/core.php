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
  }


// echo json_encode($core->logging_in("Admin","123"));





?>
