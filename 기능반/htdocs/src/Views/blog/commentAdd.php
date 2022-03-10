<?php
use src\App\DB;
extract($_POST);
$data = DB::execute("INSERT INTO `comment`(`uidx`, `pidx`, `writer`, `content`, `date`) VALUES (?,?,?,?,?)", array(user()->idx, $pidx, user()->name, $content, date("Y-m-d", time())));
if($data) {
    back("성공");
}