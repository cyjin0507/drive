<?php

spl_autoload_register(function ($className) {
    $classFilePath = __ROOT . __DS . str_replace('\\', __DS, $className) . '.php';
    require_once $classFilePath;
});
