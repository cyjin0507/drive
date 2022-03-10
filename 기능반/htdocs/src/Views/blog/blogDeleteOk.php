<?php
use src\App\DB;
extract($_GET);
if(user()->name != $user_name) {
    back("블로그 권한이 없습니다.");
}
$data = DB::execute("DELETE FROM `post` WHERE idx = ?", array($idx));
if($data) {
    redirect("/blog?menu=".$menu."&user_name=".user()->name, "삭제 완료");
}