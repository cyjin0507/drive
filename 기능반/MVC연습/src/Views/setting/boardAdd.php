<?php
use src\App\DB;
extract($_POST);
$data = DB::execute("INSERT INTO `board`(`uidx`, `board_id`) VALUES (?,?)", array(user()->idx, $board_id));
if($data) {
    back("성공");
}