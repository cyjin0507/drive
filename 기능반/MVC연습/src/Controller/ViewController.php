<?php
namespace src\Controller;

// use src\App\Controller;

// use src\App\D
class ViewController extends Controller {
    public function main() {
        $this->view('/index', []);
    }

    public function login() {
        $this->view('/user/login', []);
    }

    public function join() {
        $this->view('/user/join', []);
    }
}