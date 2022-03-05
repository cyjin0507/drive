<?php
require_once('./db/lib.php');
$query = "
INSERT INTO `board`(`uidx`, `board_id`) VALUES (?,?)
";
$bind = array(user()->idx, $_POST['id']);
$data = DB::execute($query, $bind);
if($data) {
    back("성공");
}