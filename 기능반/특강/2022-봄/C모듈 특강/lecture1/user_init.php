<?php
require_once "lib.php";

$sql = "SELECT * FROM users";
$result = DB::fetchAll($sql, []);
if(!$result) {
    $id = array("admin", "user");
    $pw = array("1","2");
    $name = array("김부산", "이코딩");
    $type = array("admin", "user");

    for($i=0; $i<2; $i++) {
        $query="
        INSERT INTO `users`(`user_id`, `user_name`, `user_pw`, `user_type`) VALUES (?,?,?,?)
        ";
        $bind = array($id[$i], $name[$i], $pw[$i], $type[$i]);
        DB::execute($query, $bind);
    }

}

// $users = DB::fetch("show table status like users");
// if($users->Auto_increment == 1) {
//     $insert_datas = array(
//         array(
//             "admin","1234","김부산", "admin"
//         ),
//         array(
//             "user","1234","이코딩", "user"
//         )
//     );
//     foreach($insert_datas as $key=>$data) {
//         DB::execute("INSERT INTO `users`(`user_id`, `user_name`, `user_pw`, `user_type`) VALUES (?,?,?,?)", $data);
//     }
// }