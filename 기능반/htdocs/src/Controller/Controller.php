<?php

namespace src\Controller;


class Controller
{
    public function render($name, $route, $data = [])
    {
        extract($data);
        require_once(__VIEWS . __DS . 'template' . __DS . 'header.php');
        if(empty($route)) {
            require_once(__VIEWS . __DS . "$name.php");
        } else {
            require_once(__VIEWS . __DS . $route . __DS . "$name.php");
        }
        require_once(__VIEWS . __DS . 'template' . __DS . 'footer.php');
    }
}
