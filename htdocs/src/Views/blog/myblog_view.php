<?php
extract($_GET);
use src\App\DB;
include('/xampp/htdocs/src/Views/template/menuList.php');
$postData = DB::fetch("SELECT * FROM post WHERE idx = ?", array($idx));
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
                                                <button class="btn btn-default btn-sm" type="button" onclick="window.location='/blog/<?=$user_name?>/<?=$menu?>'">목록보기</button>
                                                <button class="btn btn-default btn-sm" type="button" onclick="window.location='/blogReply/<?=$idx?>/<?=$menu?>/<?=$user_name?>'">답글</button>
                                                <button class="btn btn-default btn-sm" type="button" onclick="window.location='myblog_modify.html'">수정</button>
                                                <button class="btn btn-default btn-sm" type="button">삭제</button>
                                            </div>
                                        </div>
                                        <div class="commentwrite col-md-12 row">
                                        <h2 class="bold">Comments</h2>
                                            <form>
                                                <textarea class="margin-bottom-20" type="text"></textarea>
                                                <button type="submit">등록</button>
                                            </form>
                                        </div>
                                        <div class="response-area col-md-12 row">
                                            <ul class="media-list">
                                                <?php
                                                $commentData = DB::fetchAll("SELECT * FROM comment WHERE pidx = ?", array($idx));
                                                foreach($commentData as $key=>$value) {
                                                    ?>
                                                    <li class="media">
                                                    <div class="post-comment">
                                                        <div class="media-body">
                                                            <span><i class="fa fa-user"></i><?=$commentData[$key]->name?></span>
                                                            <p><?=$commentData[$key]->content?></p>
                                                            <ul class="nav navbar-nav post-nav">
                                                                <li><i class="fa fa-clock-o"></i> <?=$commentData[$key]->date?></li>
                                                            </ul>
                                                        </div>

                                                        <div class="pull-right">
                                                            <button class="btn btn-default btn-xs" type="button">수정</button>
                                                            <button class="btn btn-default btn-xs" type="button">삭제</button>
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
    
    <!-- footer -->
    <footer id="footer">
        <div class="container">
            <div class="row">
                <div class="col-sm-12  text-center bottom-separator">
                    <img src="images/home/under.png" class="img-responsive inline" alt="">
                </div>
                <div class="col-md-4 col-sm-4 col-xs-4">
                    <div class="testimonial bottom">
                        <h2>Testimonial</h2>
                        <div class="media">
                            <div class="media-body">
                                <blockquote>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt</blockquote>
                                <h3><a href="#">- Jhon Kalis</a></h3>
                            </div>
                         </div>
                        <div class="media">
                            <div class="media-body">
                                <blockquote>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt</blockquote>
                                <h3><a href="">- Abraham Josef</a></h3>
                            </div>
                        </div>   
                    </div> 
                </div>
                <div class="col-md-3 col-sm-3 col-xs-3">
                    <div class="contact-info bottom">
                        <h2>Contacts</h2>
                        <address>
                        E-mail: <a href="mailto:someone@example.com">email@email.com</a> <br> 
                        Phone: +1 (123) 456 7890 <br> 
                        Fax: +1 (123) 456 7891 <br> 
                        </address>

                        <h2>Address</h2>
                        <address>
                        Unit C2, St.Vincent's Trading Est., <br> 
                        Feeder Road, <br> 
                        Bristol, BS2 0UY <br> 
                        United Kingdom <br> 
                        </address>
                    </div>
                </div>
                <div class="col-md-4 col-sm-4 col-xs-4">
                    <div class="contact-form bottom">
                        <h2>Send a message</h2>
                        <form id="main-contact-form" name="contact-form" method="post" action="sendemail.php">
                            <div class="form-group">
                                <input type="text" name="name" class="form-control" required="required" placeholder="Name">
                            </div>
                            <div class="form-group">
                                <input type="email" name="email" class="form-control" required="required" placeholder="Email Id">
                            </div>
                            <div class="form-group">
                                <textarea name="message" id="message" required="required" class="form-control" rows="8" placeholder="Your text here"></textarea>
                            </div>                        
                            <div class="form-group">
                                <input type="submit" name="submit" class="btn btn-submit" value="Submit">
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="copyright-text text-center">
                        <p>&copy; Todo Blog 2019. All Rights Reserved.</p>
                        <p>Designed by <a target="_blank" href="http://www.dojo.com">DOJO</a></p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
</body>
</html>
