<?php

namespace src\Controller;
use src\App\lib;


class BlogController extends Controller
{
    public function myblog()
    {
        $this->render('myblog', 'blog');
    }

    public function blogView()
    {
        $this->render('myblog_view', 'blog');
    }

    public function blogReply()
    {
        $this->render('myblog_reply', 'blog');
    }

    public function blogModify()
    {
        $this->render('myblog_modify', 'blog');
    }

    public function blogWrite()
    {
        $this->render('myblog_write', 'blog');
    }

    public function blogWriteOk()
    {
        $this->render('blogWriteOk', 'blog');
    }

    public function commentAdd()
    {
        $this->render('commentAdd', 'blog');
    }

    public function blogModifyOk()
    {
        $this->render('blogModifyOk', 'blog');
    }

    public function blogReplyOk()
    {
        $this->render('blogReplyOk', 'blog');
    }

    public function blogDeleteOk()
    {
        $this->render('blogDeleteOk', 'blog');
    }

    public function commentRemove()
    {
        $this->render('commentRemove', 'blog');
    }

}