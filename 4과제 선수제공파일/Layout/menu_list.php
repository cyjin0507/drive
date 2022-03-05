<?php
$menu;
if(!isset($_GET['menu'])) {
    $menu = oneMenu()->idx;
} else {
    $menu = $_GET['menu'];
}

?>
<div class="col-md-3 col-sm-3 col-xs-3">
                                    <div class="sidebar portfolio-sidebar">
                                        <div class="sidebar-item categories">
                                            <h3>블로그 메뉴</h3>
                                            <ul class="nav navbar-stacked">
                                                <?php
                                                foreach(myMenu() as $key=>$value) {
                                                    if($menu == myMenu()[$key]->idx) {
                                                        ?>
                                                        <li class="active"><a href="./myblog.php?menu=<?=myMenu()[$key]->idx?>"><?=myMenu()[$key]->name?><span class="pull-right">(3)</span></a></li>
                                                        <?php
                                                    } else {
                                                        ?>
                                                        <li><a href="./myblog.php?menu=<?=myMenu()[$key]->idx?>"><?=myMenu()[$key]->name?><span class="pull-right">(8)</span></a></li>
                                                        <?php
                                                    }
                                                    ?>
                                                    <?php
                                                }
                                                ?>
                                            </ul>
                                        </div>
                                    </div>
                                </div>