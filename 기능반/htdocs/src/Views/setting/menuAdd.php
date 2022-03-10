<?php
use src\App\DB;
extract($_POST);
$data = DB::execute("INSERT INTO `menu`(`uidx`, `bidx`, `name`) VALUES (?,?,?)",
array(user()->idx, 0, $menu));

if($data) {
    back("성공");
}