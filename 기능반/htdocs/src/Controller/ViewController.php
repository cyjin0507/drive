<?php

namespace src\Controller;
use src\App\DB;


class ViewController extends Controller
{
    public function main()
    {
        $this->render('index', '');
    }


    public function login()
    {
        $this->render('login', 'user');
    }
}


// AppleController::init();
