<?php
namespace src\Controller;

class UserController extends Controller {
    public function loginOk() {
        $this->view("/user/loginOk", []);
    }

    public function logout() {
        $this->view("/user/logout", []);
    }
}