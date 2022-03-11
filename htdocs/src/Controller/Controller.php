<?php
namespace src\Controller;
use src\App\View;
class Controller {
    public function view($page, $datas = array()) {
        $view = new View($page);
        $view->render($datas);
    }
}