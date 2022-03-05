<?php
require_once('./db/lib.php');
$query = "
SELECT * FROM users WHERE id = ? and password = ?
";
$bind = array($_POST['id'], $_POST['pw']);
$data = DB::fetch($query, $bind);
if($data) {
    session()->set("user", $data);
    redierct("로그인 완료", "./index.php");
} else {
    back("로그인 실패");
}