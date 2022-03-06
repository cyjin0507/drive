<?php
require_once('lib.php');
require_once('user_init.php')
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/js/jquery-3.6.0.min.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <title>Document</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>

    <!-- start -->
    <div class="header">
        <div class="container">
            <div class="logo">
                LOGO
            </div>
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    부산국제영화제
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a class="dropdown-item" href="#">개최개요</a></li>
                                    <li><a class="dropdown-item" href="#">행사안내</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">출품일정</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">상영일정</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">상영작검색</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    이벤트
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a class="dropdown-item" href="#">영화티저 콘테스트</a></li>
                                    <li><a class="dropdown-item" href="#">콘테스트 참여하기</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <ul class="nav d-flex">
                <li class="nav-item">
                    <a class="nav-link" href="/user/login.php">로그인</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/user/register.php">회원가입</a>
                </li>
            </ul>
        </div>
    </div>
    <!-- end -->

    <div class="main">
        <div class="container">

        