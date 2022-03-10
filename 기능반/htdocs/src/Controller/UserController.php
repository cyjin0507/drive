<?php

namespace src\Controller;
use src\App\lib;


class UserController extends Controller
{
    public function loginOk()
    {
        $this->render('login_ok', 'user');
    }

    public function logout() {
        $this->render('logout', 'user');
    }

    public function join() {
        $this->render('join', 'user');
    }

}


// AppleController::init();
