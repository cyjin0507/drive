<?php
require_once('./db/lib.php');
$query = "
DELETE FROM `board` WHERE idx = ?
";
$bind = array($_GET['idx']);
$data = DB::execute($query, $bind);
if($data) {
    back("성공");
}