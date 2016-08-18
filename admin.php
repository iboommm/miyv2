<?php
define('CHK_ADMIN',1);
define('CORE_MIY',1);

require_once 'libs/Smarty.class.php';

require_once 'configs/core/core.php';
require_once 'configs/core/class.admin.php';

$core = new Core();
$admin = new Admin();
$template = new Smarty;

    $template->setTemplateDir('./templates')
           ->setCompileDir('./cache/compile')
           ->setCacheDir('./cache');



//$smarty->force_compile = true;
$template->debugging = false;
$template->caching = true;
$template->cache_lifetime = 120;
$template->left_delimiter = '[[';
$template->right_delimiter = ']]';

$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

if(isset($_SESSION["user"]) && $core->checkKeyLog() == false) {
    $template->assign("username", $_SESSION['user']);
    $template->display('admin/index.html');   
}elseif(isset($_SESSION["key-log"]) == true || $core->checkKeyLog() == true) {
    $admin->setKeyAPI($_SESSION['key-log']);
    $admin->checkAPIkey();
    $template->display('admin/login.html');    
}else {
    echo $_SESSION['key-log'];
    session_destroy();
    exit("Access Denied");
}

