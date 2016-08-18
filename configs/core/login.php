<?php 
    define("CORE_MIY",1);

    require_once "core.php";
    
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    if(isset($request->access) == false) {
        exit("Access Denied");
    }

    $access = $request->access;
    
    $core = new Core();
    $result = $core->logging($access);
    if($result == 1) {
        echo 1;
        
    }else {
        echo 0;
    }



    



