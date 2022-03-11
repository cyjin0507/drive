<?php
use src\App\DB;
extract($_POST);
$data = DB::execute('INSERT INTO `post`(`uidx`, `bidx`, `title`, `writer`, `content`, `view`, `date`, `answer`) VALUES (?,?,?,?,?,?,?,?)', 
array(user()->idx, getBidx($bidx), $title, user()->name, $content, 0 ,date('Y-m-d', time()), $idx));

if($data) {
    redirect("작성 완료", "/blog/" . user()->name . "/" . $bidx);
}