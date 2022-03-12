<?php
use src\App\DB;
extract($_GET);
$data = DB::execute("DELETE FROM `users` WHERE idx=?", array($idx));
if($data) {
    back("삭제완료");
}