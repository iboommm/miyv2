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
    $database = new Database();
    $access = base64_decode($request->access);

    $access = explode(",",$access);
    
    $modules = array(null,'setting', 'group','category','member','blog');
    $parameter = $access[1];

    $module = in_array($access[0], $modules) ? $access[0] : $modules[0];
    $ar['table'] = "$module";
        
    if($module == "member" && $parameter != "0") {
        $ar['fields'] = "`id`, `username`, `password`, `email`, `group_id` ";
        $ar["condition"] = "`username` LIKE '$parameter'";
    }elseif($parameter == "total") {
        $query = $database->select($ar);
        $rows = $database->rows($query);
        echo json_encode($rows);
        exit();
    }elseif($parameter == "page") {
        $page = $access[2];
        $per_page = 10;
        $page = ($page-1)*$per_page;
        $ar["limit"] = "$page,$per_page";
        $ar["order"] = " `blog`.`id` DESC";
    }
    
    $select = $database->select($ar);
    
    $resultSet = array();
    while($data = $database->get($select)) {
        $resultSet[] = $data;
    }

    echo json_encode($resultSet);
    



