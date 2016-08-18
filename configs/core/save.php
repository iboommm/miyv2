<?php 
    define("CORE_MIY",1);

    require_once "core.php";
    
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    if(isset($request->access) == false) {
        exit("Access Denied");
    }

    $data = explode(",",base64_decode($request->access));
    