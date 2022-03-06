<?php
require_once('../lib.php');

validation($_POST);
extract($_POST);

$query ="
SELECT * FROM users WHERE user_id = ?
";
$bind = array($id);
$user = DB::fetch($query, $bind);

if(!$user) {
    back("입력하신 아이디가 존재X");
}

if($user->user_pw !== $pw) {
    back("입력하신 비밀번호가 존재X");
}

session()->set("user", $user);
redirect("로그인 성공","../index.php");

