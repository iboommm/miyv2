<?php 
    define("CORE_MIY",1);

    require_once "core.php";
    
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $core = new Core();
    if($core->checkLogSession() == false) {
        exit("Access Denied");
    }elseif(isset($request->access) == false) {
        exit("Access Denied");
    }
    
    $access = base64_decode($request->access);
    
    if($access == "setting,0") {
        $access = "setting";
    }

    $database = new Database();
    
    $ar = array('table' => "$access");
    $select = $database->select($ar);
    $data = $database->get($select);
    
    echo json_encode($data);



    



