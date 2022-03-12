<?php
use src\App\DB;
extract($_POST);
$data = DB::fetch("SELECT * FROM users WHERE id=? and password=?", array($id, $pw));
if($data) {
    $_SESSION['user'] = $data;
    redirect("로그인 성공", '/');
} else {
    back("로그인 실패");
}