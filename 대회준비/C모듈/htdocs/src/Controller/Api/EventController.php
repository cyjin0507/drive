<?php

namespace src\Controller\Api;

use src\App\DB;

class EventController
{
    public function applicants()
    {
        extract($_POST);

        try {
            $user = DB::fetch("SELECT * FROM event_user WHERE phone = ?", array($phone));
            if (!$user) {
                DB::execute("INSERT INTO event_user (`phone`) VALUES (?)", array($phone));
            }

            $eventCheckSql = "SELECT * FROM `event` WHERE phone = ? AND create_dt = ?";
            $nowJoinEvent = DB::fetch($eventCheckSql, array($phone, date("Y-m-d")));
            if ($nowJoinEvent) {
                $response = array("message" => "하루에 한번만 참여할 수 있습니다.");
                returnJSON($response, 401);
            }

            $prevDay = date("Y-m-d", strtotime("-1 days"));
            $prevJoinEvent = DB::fetch($eventCheckSql, array($phone, $prevDay));

            if ($prevJoinEvent) {
                $total_event_join = $user->total_event_join ?? 1;
                $total_event_join += 1;
            } else {
                $total_event_join = 1;
                DB::execute("DELETE FROM `event` WHERE `phone` = ?", array($phone));
            }

            DB::execute("UPDATE `event_user` SET `total_event_join` = ? WHERE `phone` = ?", array($total_event_join, $phone));

            DB::execute("INSERT INTO `event` (`name`, `phone`, `score`) VALUES (?, ?, ?)", array($name, $phone, $score));

            $response = array("message" => "이벤트에 참여해 주셔서 감사합니다.");
            returnJSON($response);
        } catch (\Throwable $th) {
            $response = array("message" => "오류가 발생했습니다. 다시 시도해 주세요.");
            returnJSON($response, 401);
        }
    }

    public function stamps($phone)
    {
        try {
            $user = DB::fetch("SELECT * FROM `event_user` WHERE phone = ?", array($phone));
            if (!$user) {
                $response = array("message" => "출석정보가 없습니다.");
                returnJSON($response, 404);
            }

            $result = array(
                "stamps" => []
            );

            $eventList = DB::fetchAll("SELECT * FROM `event` WHERE phone = ?", array($phone));
            foreach ($eventList as $key => $event) {
                $result['stamps'][] = $event->create_dt;
            }

            returnJSON($result);
        } catch (\Throwable $th) {
            $response = array("message" => "오류가 발생했습니다. 다시 시도해 주세요.");
            returnJSON($response, 401);
        }
    }
}
