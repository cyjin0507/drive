<?php
use src\App\DB;
extract($_POST);

$data = DB::execute("INSERT INTO `post`(`uidx`, `bidx`, `title`, `writer`, `content`, `view`, `date`, `answer`) VALUES (?,?,?,?,?,?,?,?)",
array(user()->idx, $bidx, $title, user()->name, $content, 0, date("Y-m-d", time()),$idx));
if($data) {
    redirect("/blog?menu=".$menu."&user_name=".user()->name,"답글 등록 성공");
}