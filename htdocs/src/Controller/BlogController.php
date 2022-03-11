<?php
namespace src\Controller;

// use src\App\Controller;

// use src\App\D
class BlogController extends Controller {
    public function blog($user_name, $menu) {
        $this->view('/blog/myblog', ['user_name'=>$user_name, 'menu'=>$menu]);
    }

    public function blogWrite($user_name, $menu) {
        $this->view('/blog/myblog_write', ['user_name'=>$user_name, 'menu'=>$menu]);
    }

    public function blogView($idx, $menu, $user_name) {
        $this->view('/blog/myblog_view', ['idx'=>$idx, 'menu'=>$menu, 'user_name'=>$user_name]);
    }

    public function blogReply($idx, $menu, $user_name) {
        $this->view('/blog/myblog_Reply', ['idx'=>$idx, 'menu'=>$menu, 'user_name'=>$user_name]);
    }


    public function blogWriteOk() {
        $this->view('/blog/blogWriteOk', []);
    }

    public function replyOk() {
        $this->view('/blog/replyOk', []);
    }

}