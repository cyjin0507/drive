<?php

namespace src\Controller;

use src\App\DB;

class AdminController
{
    public function login()
    {
        extract($_POST);

        $admin = DB::fetch("SELECT * FROM `admin` WHERE admin_id = ? AND admin_pw = ?", array($admin_id, $admin_pw));

        if (!$admin) {
            back("일치하지 않은 로그인 정보 입니다.");
        }

        $_SESSION['admin'] = $admin;
        redirect("/", "로그인 되었습니다.");
    }

    public function modifySpecialityGoods()
    {
        foreach ($_POST as $key => $data) {
            $_POST[$key] = trim($data);
        }

        $file = $_FILES['image'];
        if (!$file['name']) {
            back("대표특상품 사진을 업로드해주세요.");
        }

        extract($_POST);

        $specialityGoods = DB::fetch("SELECT * FROM `specialitygoods` WHERE idx = ?", array($idx));
        $prevSpecialityGoodsImage = __SPECIALITYGOODS . __DS . $specialityGoods->image;

        if (file_exists($prevSpecialityGoodsImage)) {
            unlink($prevSpecialityGoodsImage);
        }

        $image = time() . $file['name'];
        $uploadFile = __SPECIALITYGOODS . __DS . $image;
        move_uploaded_file($file['tmp_name'], $uploadFile);

        $bind = array($city, $title, $list, $image, $idx);
        DB::execute("UPDATE `specialitygoods` SET `city` = ?, `title`= ?, `list` = ?, `image` = ? WHERE `idx` = ?", $bind);

        redirect("/admin/specialityGoods", "수정되었습니다.");
    }
}
