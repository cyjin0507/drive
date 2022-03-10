<?php
use src\App\DB;
extract($_GET);
include('/xampp/htdocs/src/Views/template/menuList.php');
if(user()->name != $user_name) {
    back("블로그 권한이 없습니다.");
}
?>
                                <div class="col-md-9 col-sm-9 col-xs-9">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h1>답글쓰기</h1>
                                            <form class="boardwrite" action="/blogReplyOk" method="POST">
                                                <label>제목
                                                    <span class="color-red">*</span>
                                                </label>
                                                <input class="form-control margin-bottom-20" type="text" name="title" required>
                                                <label>작성자
                                                    <span class="color-red">*</span>
                                                </label>
                                                <input class="form-control margin-bottom-20" type="text" disabled value="<?=$user_name?>">
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <label>내용
                                                            <span class="color-red">*</span>
                                                        </label>
                                                        <textarea class="form-control margin-bottom-20" name="content" required></textarea>
                                                    </div>
                                                </div>
                                                <hr>
                                                <div class="row">
                                                    <div class="col-lg-12 text-right">
                                                        <?php
                                                        $bidx = DB::fetch("SELECT * FROM menu WHERE idx = ?", array($menu))->bidx;
                                                        ?>
                                                        <input type="hidden" name="bidx" value="<?=$bidx?>">
                                                        <input type="hidden" name="menu" value="<?=$menu?>">
                                                        <input type="hidden" name="idx" value="<?=$idx?>">
                                                        <button class="btn btn-primary btn-sm" type="submit">글작성</button>
                                                        <button class="btn btn-default btn-sm" type="reset">다시작성하기</button>
                                                        <button class="btn btn-default btn-sm" type="button" onclick="history.back();">취소</button>
                                                    </div>
                                                </div>
                                            </form> 
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
