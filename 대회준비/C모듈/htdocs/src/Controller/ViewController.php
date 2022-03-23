<?php

namespace src\Controller;

use src\App\DB;

class ViewController
{
    public function mainPage()
    {
        view("user/main");
    }

    public function specialityGoodsPage()
    {
        $datas['specialityGoodsList'] = DB::fetchAll("SELECT * FROM `specialityGoods`");
        view("user/specialityGoods", $datas);
    }

    public function eventPage()
    {
        view("user/event");
    }

    public function purchaseReviewPage()
    {
        view("user/purchaseReview");
    }

    public function adminLoginPage()
    {
        view("admin/login");
    }

    public function adminSpecialityGoodsPage()
    {
        $datas['specialityGoodsList'] = DB::fetchAll("SELECT * FROM `specialityGoods`");
        view("admin/specialityGoods", $datas);
    }

    public function modifySpecialityGoodsPage($idx)
    {
        $datas['specialityGoods'] = DB::fetch("SELECT * FROM `specialityGoods` WHERE idx = ?", array($idx));

        if (!$datas['specialityGoods']) {
            back("특상품을 찾을 수 없습니다.");
        }

        view("admin/modifySpecialityGoods", $datas);
    }

    public function adminEventPage()
    {
        $datas['datas'] = [];
        if (isset($_GET['date'])) {
            $date = $_GET['date'];
            $eventUserList = DB::fetchAll("SELECT * FROM `event` WHERE create_dt = ?", array($date));
            foreach ($eventUserList as $key => $user) {
                $user->stamps = DB::fetchAll("SELECT * FROM `event` WHERE phone = ? AND create_dt >= ?", array($user->phone, $date));
            }

            $datas['datas'] = $eventUserList;
        }

        view("admin/event", $datas);
    }
}
