<?php
require_once('./db/lib.php');
$query = "
UPDATE `post` SET title=?, writer=?, content=? WHERE idx=?
";
$bind = array($_POST['title'], $_POST['writer'], $_POST['content'], $_POST['idx']);
$data = DB::execute($query, $bind);
if($data) {
    redierct("완료","myblog_view.php?idx=".$_POST['idx']);
}