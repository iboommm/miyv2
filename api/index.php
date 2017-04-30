<?php

  define('CORE', '1');

  require '../src/flight/Flight.php';
  require '../lib/core.php';



  Flight::route('POST /login', function(){
      $rawData = file_get_contents("php://input");
      $decode = json_decode($rawData);
      $core = new Core();
      echo $core->logging_in($decode->username,$decode->password);
  });






  Flight::start();

 ?>
