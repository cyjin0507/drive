<?php
use \src\App\DB;
extract($_GET);
include('/xampp/htdocs/src/Views/template/menuList.php');
$postData = DB::fetch("SELECT * FROM post WHERE idx = ?", array($idx));
$commentData = DB::fetchAll("SELECT * FROM comment WHERE pidx = ?", array($idx));
?>
                                <div class="col-md-9 col-sm-9 col-xs-9">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h1>글보기</h1>
                                            <div class="subject">
                                                <small>[제목]</small> <?=$postData->title?>
                                            </div>
                                            <div class="post-bottom overflow">
                                                
                                                <ul class="nav navbar-nav post-nav">
                                                    <li><i class="fa fa-tag"></i> 작성자 : <?=$postData->writer?></li>
                                                    <li><i class="fa fa-clock-o "></i> 작성일 : <?=$postData->date?></li>
                                                    <li><i class="fa fa-comments"></i> 조회 : <?=$postData->view?></li>
                                                </ul>
                                            </div>
                                            <div class="viwebox">
                                                <?=$postData->content?>
                                            </div>
                                            <hr>
                                            <div class="pull-right">
                                                <button class="btn btn-default btn-sm" type="button" onclick="window.location='/blog?menu=<?=$menu?>&user_name=<?=$userData->name?>'">목록보기</button>
                                                <button class="btn btn-default btn-sm" type="button" onclick="window.location='/blogReply?menu=<?=$menu?>&user_name=<?=$userData->name?>&idx=<?=$idx?>'">답글</button>
                                                <button class="btn btn-default btn-sm" type="button" onclick="window.location='/blogModify?menu=<?=$menu?>&user_name=<?=$userData->name?>&idx=<?=$idx?>'">수정</button>
                                                <button class="btn btn-default btn-sm" type="button" onclick="window.location='/blogDeleteOk?menu=<?=$menu?>&user_name=<?=$userData->name?>&idx=<?=$idx?>'">삭제</button>
                                            </div>
                                        </div>
                                        <div class="commentwrite col-md-12 row">
                                        <h2 class="bold">Comments</h2>
                                            <form action="/commentAdd" method="POST">
                                                <input type="hidden" name="pidx" value="<?=$postData->idx?>">
                                                <textarea class="margin-bottom-20" type="text" name="content" required></textarea>
                                                <button type="submit">등록</button>
                                            </form>
                                        </div>
                                        <div class="response-area col-md-12 row">
                                            <ul class="media-list">
                                                <?php
                                                foreach($commentData as $key => $value)  {
                                                    ?>
                                                    <li class="media">
                                                        <div class="post-comment">
                                                            <div class="media-body">
                                                                <span><i class="fa fa-user"></i><?=$commentData[$key]->writer?></span>
                                                                <p><?=$commentData[$key]->content?></p>
                                                                <ul class="nav navbar-nav post-nav">
                                                                    <li><i class="fa fa-clock-o"></i> <?=$commentData[$key]->date?></li>
                                                                </ul>
                                                            </div>

                                                            <div class="pull-right">
                                                                <button class="btn btn-default btn-xs" type="button">수정</button>
                                                                <button class="btn btn-default btn-xs" type="button"><a href="/commentRemove?idx=<?=$commentData[$key]->idx?>&name=<?=$commentData[$key]->writer?>">삭제</a></button>
                                                            </div>
                                                        </div>                                                       
                                                    </li>
                                                    <?php
                                                }
                                                ?>

                                            </ul>                   
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
