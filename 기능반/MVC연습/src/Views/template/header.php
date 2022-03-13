<?php
use src\App\DB;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Todo Blog</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/font-awesome.min.css" rel="stylesheet">
	<link href="/css/main.css" rel="stylesheet">
</head>

<body>
	<header id="header"> 

        <!-- topicon -->    
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-xs-12 overflow">
                   <div class="social-icons pull-right">
                        <ul class="nav nav-pills">
                            <li><a href=""><i class="fa fa-facebook"></i></a></li>
                            <li><a href=""><i class="fa fa-twitter"></i></a></li>
                            <li><a href=""><i class="fa fa-google-plus"></i></a></li>
                            <li><a href=""><i class="fa fa-dribbble"></i></a></li>
                            <li><a href=""><i class="fa fa-linkedin"></i></a></li>
                        </ul>
                    </div> 
                </div>
             </div>
        </div>
        
        <!-- navigation -->
        <div class="container">
            <div class="row">
                <div class="pull-left">
                    <a class="navbar-brand" href="index.html">
                    	<h1><img src="/images/logo.png" alt="logo"></h1>
                    </a>
                </div>
                <div class="pull-right">
                    <ul class="navi">
                        <li>
                            <?php
                            if(user()) {
                                ?>
                                <a href="/logout" title="로그인">
                                    로그아웃
                                </a>
                                <?php
                            } else {
                                ?>
                                <a href="/login" title="로그인">
                                    로그인
                                </a>
                                <?php
                            }
                            ?>
                        </li>
                        <li>
                            <a href="join.html" title="회원가입">
                                회원가입
                            </a>
                        </li>
                        <li>
                            <a href="/blog/<?=user() ? user()->name : ''?>" title="내 블로그" target="_blank">
                                내 블로그
                            </a>
                        </li>
                        <li>
                            <a href="/preferences" title="블로그관리">
                                블로그관리
                            </a>
                        </li>
                    </ul>
                </div>
           </div> 
        </div>
      
    </header>