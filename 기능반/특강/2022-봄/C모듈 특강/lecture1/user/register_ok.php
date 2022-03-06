<?php
// 아이디 : 영문 또는 숫자 4~10글자, 단 숫자로만X
// 비밀번호 : 영문과 숫자 모두 포함 8~14그라자
// 이름 : 한글 4글자 이하
require_once('../lib.php');

validation($_POST);
extract($_POST);

$user = DB::fetch("SELECT * FROM users WHERE user_id=?", array($id));

if($user) {
    back("이미 존재하는 아이디입니다.");
}

if(!preg_match("/^[a-zA-Z0-9]{4,10}$/", $user_id) || preg_match("/^[0-9]+$/", $user_id)) {
    back("아이디 오류");
}

if(preg_match("/^(?=.*0-9)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,14}$/", $user_pw)) {
    back("비번 오류");
}

if(!preg_match("/^[ㄱ-ㅎ|ㅏ-ㅣ| 가-힣]{1,4}$/u", $user_name)) {
    back("이름 형식 오류");
}