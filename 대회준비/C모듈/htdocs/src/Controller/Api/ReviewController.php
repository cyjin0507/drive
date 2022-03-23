<?php

namespace src\Controller\Api;

use src\App\DB;

class ReviewController
{
    public function addReview()
    {
        extract($_POST);

        foreach ($_POST as $key => $data) {
            if (empty(trim($data))) {
                $response = array("message" => "필수 입력값이 누락 되었습니다.");
                returnJSON($response, 401);
            }
        }

        $images = $_FILES['images'];

        foreach ($images['name'] as $key => $imageName) {
            if (empty(trim($imageName))) {
                $response = array("message" => "필수 입력값이 누락 되었습니다.");
                returnJSON($response, 401);
            }
        }

        try {
            $bind = array($name, $product, $shop, $purchase_date, $contents, $score);
            DB::execute("INSERT INTO review (`name`, `product`, `shop`, `purchase_date`, `contents`, `score`) values (?, ?, ?, ?, ?, ?)", $bind);
            $reviewIdx = DB::lastId();
            foreach ($images['name'] as $key => $name) {
                $image = time() . $name;
                $uploadFile = __REVIEW . __DS . $image;
                move_uploaded_file($images['tmp_name'][$key], $uploadFile);
                setReviewImage($uploadFile);
                DB::execute("INSERT INTO review_image (`review_idx`, `image`) VALUES (?, ?)", array($reviewIdx, $image));
            }
            $response = array("message" => "구매 후기가 등록되었습니다.");
            returnJSON($response);
        } catch (\Throwable $th) {
            $response = array("message" => "오류가 발생했습니다. 다시 시도해 주세요.");
            returnJSON($response, 401);
        }
    }

    public function getReviews()
    {
        try {
            $result = array();
            if (isset($_GET['last-key'])) {
                $end = (int) $_GET['last-key'] - 1;
            } else {
                $end = DB::fetch("SELECT count(*) as cnt FROM review")->cnt;
            }

            $start = $end - 9;

            $reviewList = DB::fetchAll("SELECT * FROM review WHERE idx BETWEEN ? AND ? ORDER BY idx DESC", array($start, $end));

            foreach ($reviewList as $key => $review) {
                $result[] = array(
                    "key" => $review->idx,
                    "name" => $review->name,
                    "product" => $review->product,
                    "shop" => $review->shop,
                    "purchase-date" => $review->purchase_date,
                    "contents" => $review->contents,
                    "score" => $review->score,
                    "photo" => DB::fetch("SELECT * FROM review_image WHERE review_idx = ?", array($review->idx)),
                );
            }
            returnJSON($result);
        } catch (\Throwable $th) {
            $response = array("message" => "오류가 발생했습니다. 다시 시도해 주세요.");
            returnJSON($response, 401);
        }
    }

    public function getReview($review_idx)
    {
        $review = DB::fetch("SELECT * FROM review WHERE idx = ?", array($review_idx));

        if (!$review) {
            $response = array("message" => "구매 후기를 찾을 수 없습니다.");
            returnJSON($response, 404);
        }

        $review->images = DB::fetchAll("SELECT * FROM review_image WHERE review_idx = ?", array($review->idx));

        $result = array(
            "name" => $review->name,
            "product" => $review->product,
            "shop" => $review->shop,
            "purchase-date" => $review->purchase_date,
            "contents" => $review->contents,
            "score" => $review->score,
            "photos" => [],
        );

        foreach ($review->images as $key => $data) {
            $result['photos'][$key]['file'] = $data->image;
        }

        returnJSON($result);
    }
}
