<?php
use src\App\DB;
extract($_GET);
if(user()->name != $user_name) {
    back('이용권한이 없습니다.');
}
$data = DB::execute("DELETE FROM `post` WHERE idx=?", array($idx));
if($data) {
    redirect("삭제완료", '/blog/'.$user_name.'/'.$menu);
}