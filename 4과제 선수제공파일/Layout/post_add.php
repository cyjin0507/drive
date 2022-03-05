<?php
require_once('./db/lib.php');
$query = "
INSERT INTO `post`(`uidx`, `bidx`, `title`, `writer`, `content`, `view`, `date`, `answer`) VALUES (?,?,?,?,?,?,?,?)
";
$bind = array(user()->idx, $_POST['bidx'], $_POST['title'], $_POST['writer'], $_POST['content'], 0, date("Y-m-d", time()), 0);
$data = DB::execute($query, $bind);
if($data) {
    redierct("작성 완료", "./myblog.php?menu=" . $_POST['idx']);
}