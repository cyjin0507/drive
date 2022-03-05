<?php
require_once("./db/lib.php");
if($_POST['board'] == 0) {
    back("게시판 미선택");
}
$query = "
UPDATE `menu` SET `bidx`=? WHERE idx = ?
";
$bind = array($_POST['board'], $_POST['midx']);
$data = DB::execute($query, $bind);
if($data) {
    back($_POST['midx']);
}