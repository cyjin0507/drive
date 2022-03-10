<?php
use \src\App\DB;
$userData = DB::fetch("SELECT * FROM users WHERE `name` = ?", array($user_name));

?>
    <!-- visual -->
    <section id="page-breadcrumb">
        <div class="vertical-center sun">
             <div class="container">
                <div class="row">
                    <div class="action">
                        <div class="col-sm-12">
                            <h1 class="title">
                                <a href="myblog.html"><?=$userData->name?>의 블로그</a>
                            </h1>
                            <p><small>Todo Blog of <?=$userData->id?> </small></p>
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
                                            <ul class="nav navbar-stacked">
                                            <?php
                                                $menus = DB::fetchAll("SELECT * FROM menu WHERE uidx = ?", array($userData->idx));
                                                foreach($menus as $key=>$value) {
                                                ?>
                                                    <li class="<?= isset($menu) && $menu== $menus[$key]->idx ? 'active' : ''?>"><a href="/blog?user_name=<?=$userData->name?>&menu=<?=$menus[$key]->idx?>"><?=$menus[$key]->name?><span class="pull-right">(8)</span></a></li>
                                                <?php
                                                }
                                                ?>
                                            </ul>
                                        </div>
                                    </div>
                                </div>