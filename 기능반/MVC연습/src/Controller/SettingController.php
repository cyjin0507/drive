<?php
namespace src\Controller;

class SettingController extends Controller {
    public function preferences() {
        $this->view('/setting/preferences', []);
    }

    public function menuAdd() {
        $this->view('/setting/menuAdd', []);
    }

    public function menuRemove($idx) {
        $this->view('/setting/menuRemove', ['idx'=>$idx]);
    }

    public function boardRegister() {
        $this->view('/setting/boardRegister', []);
    }

    public function boardAdd() {
        $this->view('/setting/boardAdd', []);
    }

    public function boardRemove($idx) {
        $this->view('/setting/boardRemove', ['idx'=>$idx]);
    }

    public function userRemove($idx) {
        $this->view('/setting/userRemove', ['idx'=>$idx]);
    }

}