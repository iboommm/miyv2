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

  Flight::route('POST /status', function(){
      $rawData = file_get_contents("php://input");
      $decode = json_decode($rawData);
      $core = new Core();
      if(isset($decode->data)) {
        echo $core->updateStatus($decode->token->token_key,$decode->token->id,$decode->data);
      }else {
        echo $core->getStatus($decode->token->token_key,$decode->token->id);
      }
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

  Flight::route('POST /seo', function(){
      $rawData = file_get_contents("php://input");
      $decode = json_decode($rawData);
      $core = new Core();
      if(!isset($decode->data)) {
        echo $core->getSEO($decode->token->token_key,$decode->token->id);
      }else {
        echo $core->updateSEO($decode->token->token_key,$decode->token->id,$decode->data);
      }
  });

  Flight::route('POST /member', function(){
      $rawData = file_get_contents("php://input");
      $decode = json_decode($rawData);
      $core = new Core();
      // echo json_encode($rawData);
      if(isset($decode->find)) {
        echo $core->getMember($decode->token->token_key,$decode->token->id,$decode->find);
      }
      if(isset($decode->data) && !isset($decode->data->id)) {
        echo $core->addMember($decode->token->token_key,$decode->token->id,$decode->data);
      }
  });


  Flight::start();

 ?>
