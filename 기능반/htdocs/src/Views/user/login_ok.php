<?php
use src\App\db;
use src\App\lib;
extract($_POST);
$data = DB::fetch("SELECT * FROM users WHERE id=? AND password=?", array($id, $pw));
if($data) {
    $_SESSION['user'] = $data;
    redirect("/", "로그인 성공");
} else {
    back("로그인 실패");
}