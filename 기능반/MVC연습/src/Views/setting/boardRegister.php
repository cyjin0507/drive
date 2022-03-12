<?php
use src\App\DB;
extract($_POST);
if($board_id == 0) {
    back("게시판을 선택하세요");
}
$data = DB::execute("UPDATE `menu` SET bidx = ? WHERE idx=?", array($board_id, $idx));
if($data) {
    back("성공");
}