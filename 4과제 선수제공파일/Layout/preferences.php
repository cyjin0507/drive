<?php
require_once('./header.php');
if(!user()) {
    redierct("로그인 후 이용 가능", "./login.php");
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
    <section id="home-slider">
        <div class="container">
            <div class="row">
                <div class="main-slider">
                    <div class="slide-text">
                        <h1>We Are Creative <br>Web Programers.</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.</p>
                        <a href="#" class="btn btn-common">SIGN UP</a>
                    </div>
                    <img src="images/home/slider/hill.png" class="slider-hill" alt="slider image">
                    <img src="images/home/slider/house.png" class="slider-house" alt="slider image">
                    <img src="images/home/slider/sun.png" class="slider-sun" alt="slider image">
                    <img src="images/home/slider/birds1.png" class="slider-birds1" alt="slider image">
                    <img src="images/home/slider/birds2.png" class="slider-birds2" alt="slider image">
                </div>
            </div>
        </div>
    </section>
    
    <!-- contents -->
    <section id="contents">
        <div class="container">
            <div class="row">
                <div class="main-content">
                    <h1 class="antitle">블로그관리</h1>

                    <!-- content inner -->
                    <div id="testimonial-container">
                        <div class="row">

                            <div class="margin-bottom">
                                <h2 class="page-header">메뉴등록</h2>
                                <div class="testimonial">
                                    <form class="menuwrite" action="./menu_add.php" method="POST">
                                        <label>메뉴이름
                                            <span class="color-red">*</span>
                                        </label>
                                        <input class="form-control margin-bottom-20" type="text" name="menu">
                                        <div class="col-lg-12 text-right">
                                            <button class="btn btn-primary btn-sm" type="submit">메뉴등록</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div class="margin-bottom">
                                <h2 class="page-header">메뉴관리</h2>
                                <div class="testimonial menulist">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th class="col-md-1">
                                                    번호
                                                </th>
                                                <th class="col-md-4">
                                                    메뉴이름
                                                </th>
                                                <th class="col-md-4">
                                                    게시판아이디
                                                </th>
                                                <th>
                                                    설정
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php
                                            foreach(myMenu() as $key=>$value) {
                                                ?>
                                                <form action="./board_register.php" method="POST">
                                                <tr>
                                                    <td>
                                                        <?= $idx = myMenu()[$key]->idx?>
                                                        
                                                        <input type="hidden" name="midx" value="<?=myMenu()[$key]->idx?>">
                                                    </td>
                                                    <td>
                                                        <?=myMenu()[$key]->name?>
                                                    </td>
                                                    <td>
                                                        <select class="form-control input-sm" name="board">
                                                            <option value="0">선택</option>
                                                            <?php
                                                            foreach(myBoard() as $key=>$value) {
                                                                ?>
                                                                <option value="<?=myBoard()[$key]->idx?>"><?=myBoard()[$key]->board_id?></option>
                                                                <?php
                                                            }
                                                            ?>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <button class="btn btn-default btn-xs" type="submit">게시판등록</button>
                                                        <button class="btn btn-default btn-xs" type="button"><a href="./menu_remove.php?idx=<?=$idx?>">메뉴삭제</a></button>
                                                    </td>
                                                </tr>
                                                </form>
                                                <?php
                                            }
                                            ?>

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="margin-bottom">
                                <h2 class="page-header">게시판등록</h2>
                                <div class="testimonial">
                                    <form class="menuwrite" action="./board_add.php" method="POST">
                                        <label>게시판아이디
                                            <span class="color-red">*</span>
                                        </label>
                                        <input class="form-control margin-bottom-20" type="text" name="id">
                                        <div class="col-lg-12 text-right">
                                            <button class="btn btn-primary btn-sm" type="submit">게시판등록</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div class="margin-bottom">
                                <h2 class="page-header">게시판리스트</h2>
                                <div class="testimonial menulist">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th class="col-md-1">
                                                    번호
                                                </th>
                                                <th class="col-md-8">
                                                    게시판아이디
                                                </th>
                                                <th>
                                                    설정
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php
                                            foreach(myBoard() as $key=>$value) {
                                                ?>
                                                <tr>
                                                    <td>
                                                        <?=myBoard()[$key]->idx?>
                                                    </td>
                                                    <td>
                                                        <?=myBoard()[$key]->board_id?>
                                                    </td>                                                
                                                    <td>
                                                        <button class="btn btn-default btn-xs" type="button"><a href="./board_remove.php?idx=<?=myBoard()[$key]->idx?>">게시판삭제</a></button>
                                                    </td>
                                                </tr>
                                                <?php
                                            }
                                            ?>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <?php
                            if(user()->type == "admin") {
                                ?>
                                <div class="margin-bottom">
                                <h2 class="page-header">회원리스트</h2>
                                <div class="testimonial menulist">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th class="col-md-1">
                                                    번호
                                                </th>
                                                <th>
                                                    아이디
                                                </th>
                                                <th>
                                                    이름
                                                </th>
                                                <th>
                                                    닉네임
                                                </th>
                                                <th>
                                                    블로그URL
                                                </th>
                                                <th>
                                                    삭제
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php
                                            foreach(userList() as $key=>$value) {
                                                ?>
                                                <tr>
                                                <td>
                                                    <?=userList()[$key]->idx?>
                                                </td>
                                                <td>
                                                    <?=userList()[$key]->id?>
                                                </td>
                                                <td>
                                                    <?=userList()[$key]->name?>
                                                </td>
                                                <td>
                                                    <?=userList()[$key]->nickname?>
                                                </td> 
                                                <td>
                                                    <a href="http://127.0.0.1/Master">http://127.0.0.1/Master</a>
                                                </td>                                                 
                                                <td>
                                                    <button class="btn btn-danger btn-xs" type="button"><a href="./user_remove.php?idx=?<?=userList()[$key]->idx?>">회원삭제</a></button>
                                                </td>
                                            </tr>
                                                <?php
                                            }
                                            ?>
                                            
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                                <?php
                            }
                            ?>

                            


                        </div>
                    </div>
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
