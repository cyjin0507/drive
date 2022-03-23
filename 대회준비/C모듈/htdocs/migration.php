<?php

use src\App\DB;

$specialityGoods = DB::fetch("show table status like 'specialityGoods'");

if ($specialityGoods->Auto_increment == 1) {
    $datas = array(
        array('L001', '창원시', '풋고추', '풋고추, 단감, 수박, 홍합'),
        array('L002', '진주시', '고추', '고추, 마, 실크, 배'),
        array('L003', '통영시', '굴', '굴, 진주, 나전칠기'),
        array('L004', '사천시', '멸치', '멸치, 단감, 쥐치포, 옹기'),
        array('L005', '김해시', '단감', '단감, 화훼, 참외, 도자기'),
        array('L006', '밀양시', '대추', '대추, 깻잎, 사과, 풋고추, 도자기'),
        array('L007', '거제시', '유자', '유자, 죽순, 알로에, 한라봉, 천혜향'),
        array('L008', '양산시', '매실', '매실, 버섯, 딸기, 달걀, 당근'),
        array('L009', '의령군', '수박', '수박, 호박, 한지, 버섯'),
        array('L010', '함안군', '곶감', '곶감, 수박, 파프리카, 연근'),
        array('L011', '창녕군', '양파', '양파, 마늘, 고추, 단감'),
        array('L012', '고성군', '방울토마토', '방울토마토, 멸치젓, 대하'),
        array('L013', '남해군', '마늘', '마늘, 고사리, 멸치'),
        array('L014', '하동군', '녹차', '녹차 인삼, 배, 작설차'),
        array('L015', '산청군', '약초', '약초, 곶감, 동충하초, 누에가루, 황화씨'),
        array('L016', '함양군', '밤', '밤, 흑돼지, 포도, 명주, 산채, 농악기'),
        array('L017', '거창군', '사과', '사과, 덩굴차, 딸기, 포도'),
        array('L018', '합천군', '돼지고기', '돼지, 작약, 양파,  돗자리, 왕골, 도자기, 한과')
    );

    foreach ($datas as $key => $data) {
        $image = $data[1] . "_" . $data[2] . ".jpg";
        $sql = "INSERT INTO `specialityGoods` (`local_code`, `city`, `title`, `list`, `image`) VALUES (?, ?, ?, ?, ?)";
        $bind = array($data[0], $data[1], $data[2], $data[3], $image);
        DB::execute($sql, $bind);
    }
}

$admin = DB::fetch("show table status like 'admin'");

if ($admin->Auto_increment == 1) {
    DB::execute("INSERT INTO `admin` (admin_id, admin_pw) VALUES (?, ?)", array('admin', '1234'));
}


/**
 * 리뷰 더미 데이터
 * 해당 코드는 필수가 아닌 테스트 하기위한 코드
 */
// $review = DB::fetch("show table status like 'review'");
// if ($review->Auto_increment == 1) {

//     for ($i = 1; $i <= 55; $i++) {
//         $bind = array("리뷰글" . $i, "테스트 상품 구매품", "구매처", date("Y-m-d"), "후기내용 솰라솰라 테스트", rand(1, 5));
//         DB::execute("INSERT INTO review (`name`, `product`, `shop`, `purchase_date`, `contents`, `score`) values (?, ?, ?, ?, ?, ?)", $bind);
//         $reviewIdx = DB::lastId();
//         DB::execute("INSERT INTO review_image (`review_idx`, `image`) VALUES (?, ?)", array($reviewIdx, "다운로드.jpg"));
//     }
// }
