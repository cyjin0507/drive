<?php
use src\App\DB;
extract($_POST);
$data = DB::execute("UPDATE `post` SET title = ?, content = ? WHERE idx =?", array($title, $content, $idx));
if($data) {
    redirect("수정완료", '/blog/'.user()->name.'/'.$menu);
}