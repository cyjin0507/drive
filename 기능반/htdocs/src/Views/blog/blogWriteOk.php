<?php
use \src\App\DB;
extract($_POST);
$data = DB::execute("INSERT INTO `post`(`uidx`, `bidx`, `title`, `writer`, `content`, `view`, `date`) VALUES (?,?,?,?,?,?,?)", 
array(user()->idx, $bidx, $title, user()->name, $content, 0, date("Y-m-d", time())));
if($data) {
    redirect("/blog?user_name=" . user()->name . "&menu=" . $menu, "작성완료");
}