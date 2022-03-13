<?php
namespace src\Controller;

class BlogController extends Controller {
    public function blog($user_name) {
        $this->view('/blog/myblog', ['user_name'=>$user_name]);
    }

    public function blog2($user_name, $menu) {
        $this->view('/blog/myblog', ['user_name'=>$user_name, 'menu'=>$menu]);
    }

    public function blogWrite($user_name, $menu,$idx) {
        $this->view('/blog/myblog_write', ['user_name'=>$user_name, 'menu'=>$menu,'idx'=>$idx]);
    }

    public function blogWriteOk() {
        $this->view('/blog/blogWriteOk', []);
    }

    public function blogView($user_name, $menu,$idx) {
        $this->view('/blog/myblog_view', ['user_name'=>$user_name, 'menu'=>$menu,'idx'=>$idx]);
    }

    public function blogReply($user_name, $menu,$idx) {
        $this->view('/blog/myblog_reply', ['user_name'=>$user_name, 'menu'=>$menu,'idx'=>$idx]);
    }

    public function blogModify($user_name, $menu,$idx) {
        $this->view('/blog/myblog_modify', ['user_name'=>$user_name, 'menu'=>$menu,'idx'=>$idx]);
    }

    public function blogModifyOk() {
        $this->view('/blog/blogModifyOk', []);
    }

    public function blogRemove($user_name, $menu, $idx) {
        $this->view('/blog/blogRemove', ['user_name'=>$user_name,'menu'=>$menu,'idx'=>$idx]);
    }

    public function commentAdd() {
        $this->view('/blog/commentAdd', []);
    }

}