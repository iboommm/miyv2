<?php

define('CHK_ADMIN',1);

require_once 'libs/Smarty.class.php';

require_once 'configs/core/core.php';
require_once 'configs/core/class.admin.php';

$smarty = new Smarty;

$smarty->setTemplateDir('./templates')
       ->setCompileDir('./cache/compile')
       ->setCacheDir('./cache');



//$smarty->force_compile = true;
$smarty->debugging = false;
$smarty->caching = true;
$smarty->cache_lifetime = 120;
$smarty->left_delimiter = '[[';
$smarty->right_delimiter = ']]';

$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

$smarty->display('admin/login.html');
