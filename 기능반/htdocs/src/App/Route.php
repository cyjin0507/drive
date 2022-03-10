<?php

namespace src\App;

class Route
{
    private static $GET = [];
    private static $POST = [];

    public static function get($url , $actions)
    {
        self::$GET[] = [$url , $actions];
    }

    public static function post($url , $actions)
    {
        self::$POST[] = [$url , $actions];
    }

    public static function init()
    {
        $url = explode("?" , $_SERVER['REQUEST_URI']);
        $actions = self::${$_SERVER['REQUEST_METHOD']};
        // print_r($actions);
        foreach($actions as $action) {
            if($action[0] == $url[0]) {
                $do = explode("@" , $action[1]);
                $cont = "src\\Controller\\" . $do[0];
                $ins = new $cont();
                $ins->{$do[1]}();
                return;
            }
        }
        echo "404";
    }
}