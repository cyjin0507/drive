<?php
use src\App\DB;
extract($_POST);
if($bidx == 0) {
    back("게시판을 선택하세요.");
}
$data = DB::execute("UPDATE `menu` SET bidx = ? WHERE idx = ?", array($bidx, $idx));
if($data) {
    back("성공");
}