<?php
use src\App\DB;
extract($_GET);
$userInfo = DB::fetch("SELECT * FROM users WHERE name = ?", array($user_name));
if(!isset($menu)) {
    $menu = DB::fetch("SELECT * FROM menu WHERE uidx = ?", array($userInfo->idx))->idx;
}
?>
<!-- visual -->
   <section id="page-breadcrumb">
        <div class="vertical-center sun">
             <div class="container">
                <div class="row">
                    <div class="action">
                        <div class="col-sm-12">
                            
                            <h1 class="title">
                                <a href="myblog.html"><?=$userInfo->name?>의 블로그</a>
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
                                            <ul class="nav navbar-stacked">
                                                <?php
                                                $menuData = DB::fetchAll("SELECT * FROM menu WHERE uidx=?", array($userInfo->idx));
                                                foreach($menuData as $key=>$value) {
                                                    ?>
                                                    <li class="<?=$menuData[$key]->idx == $menu ? 'active' : ''?>"><a href="/blog/<?=$user_name?>/<?=$menuData[$key]->idx?>"><?=$menuData[$key]->name?><span class="pull-right">(3)</span></a></li>
                                                    <?php
                                                }
                                                ?>
                                            </ul>
                                        </div>
                                    </div>
                                </div>