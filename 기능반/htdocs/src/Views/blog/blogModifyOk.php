<?php
use src\App\DB;
extract($_POST);
$data = DB::execute("UPDATE `post` SET title = ?, content = ? WHERE idx =?", array($title, $content, $idx));
if($data) {
    redirect("/blogView?menu= " . $menu . "&user_name=" . user()->name ."&idx=" . $idx, "수정 성공");
}