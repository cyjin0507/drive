<?php
require_once('./db/lib.php');
$query = "
INSERT INTO `menu`(`uidx`, `bidx`, `name`) VALUES (?,?,?)
";
$bind = array(user()->idx, 0, $_POST['menu']);
$data = DB::execute($query, $bind);
if($data) {
    back("성공");
}