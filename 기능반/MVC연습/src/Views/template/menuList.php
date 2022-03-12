<?php
use src\App\DB;
extract($_GET);
?>    
    <!-- visual -->
    <section id="page-breadcrumb">
        <div class="vertical-center sun">
             <div class="container">
                <div class="row">
                    <div class="action">
                        <div class="col-sm-12">
                            <?php
                            $userInfo = DB::fetch("SELECT * FROM users WHERE name=?", array($user_name));
                            ?>
                            <h1 class="title">
                                <a href="/blog/<?=$user_name?>/<?=$menu?>"><?=$userInfo->name?>의 블로그</a>
                            </h1>
                            <p><small>Todo Blog of <?=$userInfo->id?> </small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </section>
    
    <!-- contents -->
    <section id="contents">
        <div class="container">
            <div class="row">
                <div class="main-content">

                    <!-- content inner -->
                    <section id="projects">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-3 col-sm-3 col-xs-3">
                                    <div class="sidebar portfolio-sidebar">
                                        <div class="sidebar-item categories">
                                            <h3>블로그 메뉴</h3>
                                            <?php
                                            $menuList = DB::fetchAll("SELECT * FROM menu WHERE uidx=?", array($userInfo->idx));
                                            ?>
                                            <ul class="nav navbar-stacked">
                                                <?php
                                                foreach($menuList as $key=>$value) {
                                                    ?>
                                                    <li class="<?=$menuList[$key]->idx == $menu ? 'active': ''?>"><a href="/blog/<?=$user_name?>/<?=$menuList[$key]->idx?>"><?=$menuList[$key]->name?><span class="pull-right">(3)</span></a></li>
                                                    <?php
                                                }
                                                ?>
                                            </ul>
                                        </div>
                                    </div>
                                </div>