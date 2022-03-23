<?php

if (!session_id()) {
    session_start();
}

$develop = false;
if ($develop) {
    ini_set('display_errors', '0');
}

define('__DS', DIRECTORY_SEPARATOR);
define('__ROOT', dirname(__DIR__));
define('__SRC', __ROOT . __DS . 'src');
define('__VIEWS', __SRC . __DS . 'view');
define('__UPLOAD', __DIR__ . __DS . 'upload');
define('__REVIEW', __UPLOAD . __DS . 'review');
define('__SPECIALITYGOODS', __UPLOAD . __DS . 'specialityGoods');

require_once __ROOT . __DS . 'autoloader.php';
require_once __ROOT . __DS . 'migration.php';
require_once __ROOT . __DS . 'lib.php';
require_once __ROOT . __DS . 'web.php';

src\App\Route::init();
