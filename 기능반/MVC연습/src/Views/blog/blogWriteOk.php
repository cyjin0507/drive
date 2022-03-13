<?php
use src\App\DB;
extract($_POST);
$data = DB::execute("INSERT INTO `post`(`uidx`, `bidx`, `title`, `writer`, `content`, `view`, `date`, `answer`) VALUES (?,?,?,?,?,?,?,?)",
array(user()->idx, getBoard($menu), $title, user()->name, $content, 0, date('Y-m-d', time()), $answer));
if($data) {
    redirect('성공', '/blog/'.user()->name . '/' . $menu);
}