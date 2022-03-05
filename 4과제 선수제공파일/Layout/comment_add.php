<?php
require_once('./db/lib.php');
$query ="
INSERT INTO `comment`(`uidx`, `pidx`, `writer`, `content`, `date`) VALUES (?,?,?,?,?)
";
$bind = array(user()->idx, $_POST['pidx'], user()->name, $_POST['content'], date("Y-m-d", time()));
$data = DB::execute($query, $bind);
if($data) {
    back("성공");
}