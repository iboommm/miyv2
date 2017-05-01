<?php

  define('CORE', '1');

  require '../src/flight/Flight.php';
  require '../lib/core.php';



  Flight::route('POST /login', function(){
      $rawData = file_get_contents("php://input");
      $decode = json_decode($rawData);
      $core = new Core();
      echo $core->logging_in($decode->data->username,$decode->data->password);
  });

  Flight::route('POST /token', function(){
      $rawData = file_get_contents("php://input");
      $decode = json_decode($rawData);
      $core = new Core();
      echo $core->getToken($decode->page,$decode->token->token_key,$decode->token->id);
  });

  Flight::route('POST /title', function(){
      $rawData = file_get_contents("php://input");
      $decode = json_decode($rawData);
      $core = new Core();
      echo $core->getTitle($decode->page,$decode->token->token_key,$decode->token->id);
  });

  Flight::route('POST /setting', function(){
      $rawData = file_get_contents("php://input");
      $decode = json_decode($rawData);
      $core = new Core();
      if(!isset($decode->data)) {
        echo $core->getSetting($decode->token->token_key,$decode->token->id);
      }else {
        echo $core->updateSetting($decode->token->token_key,$decode->token->id,$decode->data);
      }

  });


  Flight::start();

 ?>
