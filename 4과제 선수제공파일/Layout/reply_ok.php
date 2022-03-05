<?php
require_once('./db/lib.php');
$query = "
INSERT INTO `post`(`uidx`, `bidx`, `title`, `writer`, `content`, `view`, `date`, `answer`) VALUES (?,?,?,?,?,?,?,?)
";
$bind = array(user()->idx, $_POST['bidx'], $_POST['title'], $_POST['writer'], $_POST['content'], 0, date("Y-m-d", time()), 1);
$data = DB::execute($query, $bind);
if($data) {
    back("완료");
}