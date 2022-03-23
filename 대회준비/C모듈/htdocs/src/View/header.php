<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2022년 지방기능경기대회</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/style.css">
    <script src="/js/jquery.min.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/script.js"></script>
</head>

<body>

    <!-- start of header -->
    <div class="header">
        <div class="container">
            <!-- start of nav -->
            <nav class="navbar navbar-expand-lg navbar-light">
                <a class="navbar-brand" href="/">Logo</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <?php if (isset($_SESSION['admin'])) { ?>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="/admin/specialityGoods">특산품 관리</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/admin/event">이벤트 관리</a>
                            </li>
                        </ul>
                    </div>
                <?php } else { ?>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="/">메인페이지</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/specialityGoods">특산품 안내</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/event">이벤트</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/purchaseReview">구매후기</a>
                            </li>
                        </ul>
                    </div>
                <?php }  ?>
            </nav>
            <!-- end of nav -->
        </div>
    </div>
    <!-- end of header -->

    <!-- start of main -->
    <div class="main">
        <div class="container py-5">