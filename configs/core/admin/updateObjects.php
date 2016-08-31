<?php

    define("CORE_MIY",1);
    define("CHK_ADMIN",1);

    require_once dirname(__FILE__) . "\..\core.php";
    require_once "class.admin.php";

    $admin = new Admin();
    if( $admin->checkAdmin() == false) {
        exit("Access Denied");
    }
    
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);


    if(isset($request[0]->access) == false) {
        exit("Access Denied");
    }

    $modules = array(null,'setting', 'group','category','member');
    $module = in_array($request[0]->access, $modules) ? $request[0]->access : $modules[0];
    
    $database = new Database();
    $core = new Core();

    if($module == "category") {
        $getIDArr['table'] = "category";
        $getIDArr['fields'] = " `id` ";
        $getByID = $database->select($getIDArr);
        $resultSet = array();
        while($data = $database->get($getByID)) {
            array_push($resultSet,(int)$data['id']);
        }
        
        $sqlObj = "";
        $obj = $request[0]->remove;
        for($i=0;$i<sizeof($obj);$i++) {
             $sqlObj .= "DELETE FROM `category` WHERE `category`.`id` = ".$obj[$i].";\n";
        }

        $obj = $request[0]->data;
        for($i=0;$i<sizeof($obj);$i++) {
            if(isset($obj[$i]->id) && in_array($obj[$i]->id,$resultSet) == true) {
                $sqlObj .= "UPDATE `category` SET `name` = '".$obj[$i]->name."', `status` = '".$obj[$i]->status."'  WHERE `category`.`id` = ".$obj[$i]->id.";\n";
//                echo "update \n";
            }else {
//                echo "insert \n";
                $sqlObj .= "INSERT INTO `category` (`id`, `name`, `status`) VALUES (NULL, '".$obj[$i]->name."', '".$obj[$i]->status."');\n";
            }
        }

        
//        echo $sqlObj;
        echo $database->multi_query($sqlObj);

        
    }