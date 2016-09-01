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

    if(isset($request->access) == false) {
        exit("Access Denied");
    }

    $data = explode(",",base64_decode($request->access));

    $modules = array(null,'setting', 'group','category','member',"blog");
    $module = in_array($data[0], $modules) ? $data[0] : $modules[0];
    $database = new Database();
    $core = new Core();
    
    if($module == "setting") {
        $ar = [
          "title" => $data[1],
          "tag" => base64_decode($data[2]),
          "switch" => $data[3]
        ];
        echo $result = $database->update("setting",$ar,"id=1");        
    }elseif($module == "member") {
        $parameter = $data[1];
        if($parameter == "add") {
            $member['username'] = base64_decode($data[2]);
            $member['password'] = md5(base64_decode($data[3]));
            $member['email'] = $data[4];
            $member['group_id'] =  $data[5];
            $member['sesLogin'] = "";
            
            $database = new Database();
            $result = $database->insert('member',$member);
            if($result == true) {
                echo 1;
            }else {
                echo 0;
            }
        }else if($parameter == "update") {
            $member['username'] = base64_decode($data[2]);
            $member['password'] = base64_decode($data[3]);
            $member['email'] = $data[4];
            $member['group_id'] =  $data[5];
            $member['id'] = $data[6];
            
            if($core->memberCheckPassword($member['id'],$member['password']) == 1) {
                echo $database->update("member",$member,"id=".$member['id']);
            }else {
                $member['password'] = md5($member['password']);
                echo $database->update("member",$member,"id=".$member['id']);
            }
        }else if($parameter == "ban"){
            $member['group_id'] =  4;
            echo $database->update("member",$member,"id=".$data[2]);
        }else if($parameter == "unban"){
            $member['group_id'] =  3;
            echo $database->update("member",$member,"id=".$data[2]);
        }
    }elseif($module == "blog") {
        $parameter = $data[1];
        if($parameter == "add") {
            $ar['title'] = $data[2]; 
            $ar['cat_by'] = $data[3]; 
            $ar['data'] = $data[4]; 
            $ar['post_by'] = $_SESSION['id'];
            $ar['status'] = 1;
            $date = new DateTime();
            $ar['time'] = $date->format('Y-m-d H:i:s');
            echo $database->insert("blog",$ar);
        }elseif($parameter == "update") {
            $ar['title'] = $data[2]; 
            $ar['cat_by'] = $data[3]; 
            $ar['data'] = base64_decode($data[4]); 
            $ar['post_by'] = $_SESSION['id'];
            $ar['status'] =  $data[5];
            $id = $ar['id'] =  $data[6];
            $date = new DateTime();
            $ar['time'] = $date->format('Y-m-d H:i:s');
//            echo $database->insert("blog",$ar);
            echo $database->update("blog",$ar,"id=$id");
        }elseif($parameter == "remove") {
            $id = $data[2]; 
            echo $database->delete("blog","id=$id");
        }
        

    }
