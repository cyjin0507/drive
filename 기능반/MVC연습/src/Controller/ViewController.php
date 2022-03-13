<?php
namespace src\Controller;

class ViewController extends Controller {
    public function main() {
        $this->view('/index', []);
    }

    public function login() {
        $this->view('/user/login', []);
    }

    public function loginOk() {
        $this->view('/user/loginOk', []);
    }

    public function logout() {
        $this->view('/user/logout', []);
    }

}