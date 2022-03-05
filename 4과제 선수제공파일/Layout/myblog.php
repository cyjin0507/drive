<?php
require_once("./header.php");
if(!user()) {
    redierct("로그인 후 이용", "./login.php");
}
if(user()->type == "admin") {
    redierct("관리자 이용 불가", "./index.php");
}


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Todo Blog</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/font-awesome.min.css" rel="stylesheet">
	<link href="css/main.css" rel="stylesheet">
</head>

<body>

    <!-- visual -->
    <section id="page-breadcrumb">
        <div class="vertical-center sun">
             <div class="container">
                <div class="row">
                    <div class="action">
                        <div class="col-sm-12">
                            <h1 class="title">
                                <a href="myblog.php">닉네임의 블로그</a>
                            </h1>
                            <p><small>Todo Blog of 아이디 </small></p>
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
                                <?php
                                require_once("./menu_list.php");
                                if(checkBoard($menu)) {
                                    ?>
                                    <div class="col-md-9 col-sm-9 col-xs-9">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h1>PHP</h1>
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
                                                        foreach(getPost($menu) as $key=>$value) {
                                                            ?>
                                                            <tr>
                                                            <td><?=getPost($menu)[$key]->idx?></td>
                                                            <td>
                                                                <?php
                                                                if(getPost($menu)[$key]->answer == 0) {
                                                                    ?>
                                                                    <a href="myblog_view.php?idx=<?=getPost($menu)[$key]->idx?>"><?=getPost($menu)[$key]->title?></a>
                                                                    <?php
                                                                } else {
                                                                    ?>
                                                                    <a href="myblog_view.php?idx=<?=getPost($menu)[$key]->idx?>">└<?=getPost($menu)[$key]->title?></a>
                                                                    <?php
                                                                }
                                                                ?>
                                                            </td>
                                                            <td><?=getPost($menu)[$key]->writer?></td>
                                                            <td><?=getPost($menu)[$key]->date?></td>
                                                            <td><?=getPost($menu)[$key]->view?></td>
                                                        </tr>
                                                            <?php
                                                        }
                                                        ?>

                                                    </tbody>
                                                </table>
                                                <div class="pull-right">
                                                    <button class="btn btn-default btn-sm" type="button" onclick="window.location='myblog_write.php?menu=<?=$menu?>&board=<?=checkBoard($menu)->bidx?>'">글쓰기</button>
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
                                    <?php
                                } else {
                                    echo "게시판 미등록";
                                }
                                ?>
                                
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
