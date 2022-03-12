<?php
use src\App\DB;
extract($_GET);
$data = DB::execute("DELETE FROM `post` WHERE idx=?", array($idx));
if($data) {
    redirect("삭제완료", "/blog/".$user_name."/".$menu);
}