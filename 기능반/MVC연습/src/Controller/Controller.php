<?php
namespace src\Controller;
use src\App\View;
class Controller {
    public function view($page, $data = []) {
        $view = new View($page);
        $view->render($data);
    }
}