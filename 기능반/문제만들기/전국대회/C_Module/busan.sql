-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 22-02-06 11:41
-- 서버 버전: 10.4.21-MariaDB
-- PHP 버전: 7.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `busan`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `resort_info`
--

CREATE TABLE `resort_info` (
  `idx` int(11) NOT NULL,
  `name` varchar(100) NOT NULL COMMENT '방의 이름을 저장한다',
  `img` varchar(100) NOT NULL COMMENT '방 이미지를 저장한다.',
  `satisfy` varchar(100) NOT NULL COMMENT '방에 대한 만족도를 저장한다.',
  `info` varchar(100) NOT NULL COMMENT '방의 대한 정보를 저장한다.',
  `price` int(11) NOT NULL COMMENT '방의 대한 가격을 저장한다.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `resort_info`
--

INSERT INTO `resort_info` (`idx`, `name`, `img`, `satisfy`, `info`, `price`) VALUES
(1, '스위트 룸(투베드)', 'room_info/room1.jpg', '4.5', '안락한 방의 채광이 제일 좋은 방, 싱글 사이즈 침대 2개~', 85000),
(2, '아이와 함께', 'room_info/room2.jpg', '4.8', '아이와 함께 오셨나요? 아이와 어른 모두 행복한 방, 놀이시설을 갖춘방~', 90000),
(3, '로얄 럭셔리 룸(투베드)', 'room_info/room3.jpg', '4.7', '오션뷰를 보기 가장 최적화 된 룸, 싱글 사이즈 침대 2개~', 110000),
(4, '커플룸', 'room_info/room4.jpg', '4.8', '부부, 연인끼리 사용하기 좋은 방, 퀸 사이즈의 넓은 침대~', 100000),
(5, '패밀리룸', 'room_info/room5.jpg', '4.2', '넓은 방, 온 가족 사용해도 충분한 방~', 80000),
(6, '싱글룸', 'room_info/room6.jpg', '4.9', '혼자 오셨다면 싱글룸~ 저렴한 가격으로 이용하세요!', 60000);

-- --------------------------------------------------------

--
-- 테이블 구조 `resort_reservation`
--

CREATE TABLE `resort_reservation` (
  `idx` int(11) NOT NULL,
  `uidx` int(11) NOT NULL COMMENT '예약자의 idx를 담아둔다.',
  `ridx` int(11) NOT NULL COMMENT '예약한 방의 idx를 담아둔다.',
  `personnel` int(11) NOT NULL COMMENT '예약인원을 담아둔다.',
  `checkIn` date NOT NULL COMMENT '체크인날짜',
  `checkOut` date NOT NULL COMMENT '체크아웃날짜',
  `date` date NOT NULL COMMENT '예약한 날짜'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `resort_reservation`
--

INSERT INTO `resort_reservation` (`idx`, `uidx`, `ridx`, `personnel`, `checkIn`, `checkOut`, `date`) VALUES
(1, 1, 1, 4, '2022-02-08', '2022-02-09', '2022-02-07'),
(2, 1, 1, 3, '2022-02-16', '2022-02-18', '2022-02-05'),
(3, 3, 2, 2, '2022-02-03', '2022-02-05', '2022-02-01'),
(4, 2, 4, 6, '2022-02-24', '2022-02-25', '2022-02-09'),
(5, 2, 4, 5, '2022-02-03', '2022-02-05', '2022-02-01');

-- --------------------------------------------------------

--
-- 테이블 구조 `rides`
--

CREATE TABLE `rides` (
  `idx` int(11) NOT NULL,
  `name` varchar(100) NOT NULL COMMENT '놀이기구의 이름을 저장한다.',
  `img` varchar(100) NOT NULL COMMENT '놀이기구의 이미지를 저장한다.',
  `satisfy` varchar(100) NOT NULL COMMENT '놀이기구의 만족도를 저장한다.',
  `tall` varchar(100) NOT NULL COMMENT '놀이기구 키제한을 저장한다.',
  `frequency` int(11) NOT NULL COMMENT '놀이기구 이용횟수를 저장한다.',
  `state` varchar(100) NOT NULL DEFAULT 'operation' COMMENT '현재 놀이기구의 상테를 저장한다.\r\n- operation : 운행중\r\n- construction : 공사중'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `rides`
--

INSERT INTO `rides` (`idx`, `name`, `img`, `satisfy`, `tall`, `frequency`, `state`) VALUES
(1, '우드코스터', 'image3.png', '4.5', '165', 210, 'construction'),
(2, '토네이도', 'image4.jpg', '4.7', '160', 125, 'operation'),
(3, '썬더볼트', 'image5.png', '4.4', '150', 79, 'operation'),
(4, '와이드드롭', 'image7.jpg', '4.5', '165', 235, 'operation'),
(5, '스카이클락', 'image8.jpg', '4.1', '160', 129, 'operation'),
(6, '번지드롭', 'image10.jpg', '4.3', '161', 223, 'operation'),
(7, '썬더보트', 'image11.jpg', '4.5', '165', 231, 'operation'),
(8, '토네이도스윙', 'image12.jpg', '4.1', '140', 124, 'operation'),
(9, '타이톤', 'image13.png', '3.9', '150', 321, 'operation'),
(10, '코스터777', 'image14.jpg', '4.5', '150', 214, 'operation'),
(11, '블라이드잭', 'image15.jpg', '4.1', '140', 53, 'construction'),
(12, '터닝코스터', 'image16.jpg', '3.5', '130', 233, 'operation'),
(13, '회전목마', 'image17.jpg', '4.8', '없음', 421, 'operation'),
(14, '애플스윙', 'image20.jpg', '4.5', '120', 217, 'operation'),
(15, '스퀘어스카이', 'image23.jpg', '4.3', '165', 151, 'operation'),
(16, '헬스터', 'image24.jpg', '4.5', '155', 123, 'operation'),
(17, '썬더폴스', 'image25.jpg', '4.1', '135', 162, 'operation'),
(18, '토네엘로', 'image26.jpg', '4.5', '145', 215, 'operation'),
(19, '바나나스윙', 'image27.jpg', '3.7', '140', 412, 'operation'),
(20, '스페이스드롭', 'image28.jpg', '4.5', '125', 145, 'operation'),
(21, '탑블레이스', 'image29.jpg', '4.8', '135', 262, 'operation'),
(22, '스페이스스윙', '\"image30.jpg', '4.1', '145', 673, 'operation');

-- --------------------------------------------------------

--
-- 테이블 구조 `users`
--

CREATE TABLE `users` (
  `idx` int(100) NOT NULL,
  `id` varchar(100) NOT NULL COMMENT '사용자의 아이디를 저장한다.',
  `pw` varchar(100) NOT NULL COMMENT '사용자의 비밀번호를 저장한다.',
  `name` varchar(100) NOT NULL COMMENT '사용자의 이름을 저장한다.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `users`
--

INSERT INTO `users` (`idx`, `id`, `pw`, `name`) VALUES
(1, 'customer_1', '1234', 'customer_1'),
(2, 'customer_2', '1234', 'customer_2'),
(3, 'customer_3', '1234', 'customer_3'),
(4, 'customer_4', '1234', 'customer_4'),
(5, 'customer_5', '1234', 'customer_5'),
(6, 'admin', '1234', 'admin');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `resort_info`
--
ALTER TABLE `resort_info`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `resort_reservation`
--
ALTER TABLE `resort_reservation`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `rides`
--
ALTER TABLE `rides`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idx`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
