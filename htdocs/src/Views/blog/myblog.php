<?php
extract($_GET);
use src\App\DB;
include('/xampp/htdocs/src/Views/template/menuList.php');
$menuData = DB::fetch("SELECT * FROM menu WHERE idx=?", array($menu));


?>

                                <div class="col-md-9 col-sm-9 col-xs-9">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h1><?=$menuData->name?></h1>
                                            <div class="boardlist">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th class="col-md-1">번호</th>
                                                            <th class="col-md-6">제목</th>
                                                            <th>작성자</th>
                                                            <th>작성일</th>
                                                            <th>조회</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <?php
                                                        $postData = DB::fetchAll("SELECT * FROM post WHERE bidx = ?", array($menuData->bidx));
                                                        foreach($postData as $key=>$value) {
                                                            ?>
                                                            <tr>
                                                                <td><?=$postData[$key]->idx?></td>
                                                                <td>
                                                                    <a href="/blogView/<?=$postData[$key]->idx?>/<?=$menu?>/<?=$user_name?>"><?=$postData[$key]->title?></a>
                                                                </td>
                                                                <td><?=$postData[$key]->writer?></td>
                                                                <td><?=$postData[$key]->date?></td>
                                                                <td><?=$postData[$key]->view?></td>
                                                            </tr>
                                                            <?php
                                                        }
                                                        ?>

                                                    </tbody>
                                                </table>
                                                <div class="pull-right">
                                                    <button class="btn btn-default btn-sm" type="button" onclick="window.location='/blogWrite/<?=$user_name?>/<?=$menu?>'">글쓰기</button>
                                                </div>
                                            </div>
                                            <div class="portfolio-pagination">
                                                <ul class="pagination">
                                                  <li><a href="#">left</a></li>
                                                  <li class="active"><a href="#">1</a></li>
                                                  <li><a href="#">2</a></li>
                                                  <li><a href="#">3</a></li>
                                                  <li><a href="#">4</a></li>
                                                  <li><a href="#">5</a></li>
                                                  <li><a href="#">6</a></li>
                                                  <li><a href="#">7</a></li>
                                                  <li><a href="#">8</a></li>
                                                  <li><a href="#">9</a></li>
                                                  <li><a href="#">right</a></li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <!-- content inner -->

                </div>
            </div>
        </div>
    </section>
