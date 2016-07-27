<?php
/**
 * Example Application
 *
 * @package Example-application
 */

require 'libs/Smarty.class.php';

$smarty = new Smarty;

$smarty->setTemplateDir('./templates')
       ->setCompileDir('./cache/compile')
       ->setCacheDir('./cache');



//$smarty->force_compile = true;
$smarty->debugging = false;
$smarty->caching = true;
$smarty->cache_lifetime = 120;

$smarty->assign("username","test");

$smarty->display('index.tpl');
