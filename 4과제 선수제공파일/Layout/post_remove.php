<?php
require_once('./db/lib.php');
$query = "
DELETE FROM `post` WHERE idx = ?
";
$bind = array($_GET['idx']);
$data = DB::execute($query, $bind);
if($data) {
    redierct("삭제완료", "./myblog.php");
}