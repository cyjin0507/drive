<?php

namespace src\Controller;
use src\App\lib;


class SettingController extends Controller
{
    public function preferences() {
        $this->render('preferences', 'setting');
    }

    public function menuAdd() {
        $this->render('menuAdd', 'setting');
    }

    public function boardRegister() {
        $this->render('boardRegister', 'setting');
    }

    function menuRemove() {
        $this->render('menuRemove', 'setting');
    }
    
    function boardAdd() {
        $this->render('boardAdd', 'setting');
    }

    function boardRemove() {
        $this->render('boardRemove', 'setting');
    }

}


// AppleController::init();
