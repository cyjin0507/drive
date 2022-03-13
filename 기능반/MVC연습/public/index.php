<?php
use src\App\Route;
date_default_timezone_set("Asia/Seoul");

define("__ROOT", dirname(__DIR__));
define("__DS", "/");
define("__SRC", __ROOT . __DS ."src");
define("__VIEW", __SRC . __DS . "views");

function myLoader($name) {
    require_once(__ROOT . __DS . str_replace("\\", "/", $name)) . ".php";
}

spl_autoload_register("myLoader");

require __ROOT . __DS . "web.php";
require __ROOT . __DS . "lib.php";
require __VIEW . __DS . "template" . __DS . "header.php";
Route::init();
require __VIEW . __DS . "template" . __DS . "footer.php";