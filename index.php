<?php
//    define("CORE_MIY",1);
//
//    require_once "configs/core/core.php";
//    
//    $postdata = file_get_contents("php://input");
//    $request = json_decode($postdata);

//    function test($request) {
//         print_r($request);
//    }
//   test($request);
$module = "";

// รายการโมดูลที่สามารถใช้งานได้
$modules = array('home', 'about');
// ตรวจสอบโมดูลที่เรียก ถ้าไม่มีใช้โมดูลแรกสุด
$module = in_array($module, $modules) ? $module : $modules[0];
// เรียกโมดูล ให้ผลลัพท์เนื้อหาของโมดูลออกมาที่ $content
