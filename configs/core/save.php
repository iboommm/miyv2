<?php 
    define("CORE_MIY",1);

    require_once "core.php";
    
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    if(isset($request->access) == false) {
        exit("Access Denied");
    }

    $data = explode(",",base64_decode($request->access));
    
    if($data[0] == "setting") {
        $database = new Database();
        $ar = [
          "title" => $data[1],
          "tag" => base64_decode($data[2]),
          "switch" => $data[3]
        ];
        $result = $database->update("setting",$ar,"id=1");
        if($result == true) {
            echo 1;
        }else {
            echo 0;
        }
    }