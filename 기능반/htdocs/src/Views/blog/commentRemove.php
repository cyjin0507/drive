<?php
use src\App\DB;
extract($_GET);
if(user()->name != $name) {
    back("삭제 권한이 없습니다.");
}
$data = DB::execute("DELETE FROM `comment` WHERE idx = ?", array($idx));
if($data) {
    back("삭제 완료");
}