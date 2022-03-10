  <?php
  use \src\App\DB;
  ?>
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
                                    <form class="menuwrite" action="/menuAdd" method="POST">
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
                                            $menu = DB::fetchAll("SELECT * FROM menu WHERE uidx=? order by idx desc", array(user()->idx));
                                            foreach($menu as $key => $value) {
                                                ?>
                                                <tr>
                                                    <form action="/boardRegister" method="POST">
                                                        <td>
                                                            <?=$idx = $menu[$key]->idx?>
                                                        </td>
                                                        <td>
                                                            <?=$menu[$key]->name?>
                                                        </td>
                                                        <td>
                                                            <?php
                                                                $board = DB::fetchAll("SELECT * FROM board WHERE uidx=? order by idx desc", array(user()->idx));
                                                            ?>
                                                            <select class="form-control input-sm" name="bidx">
                                                                <option value="0">선택</option>
                                                                <?php
                                                                foreach($board as $key => $value) {
                                                                    ?>
                                                                    <option value="<?=$board[$key]->idx?>"><?=$board[$key]->board_id?></option>
                                                                    <?php
                                                                }
                                                                ?>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <input type="hidden" name="idx" value="<?=$idx?>">
                                                            <button class="btn btn-default btn-xs" type="submit">게시판등록</button>
                                                            <button class="btn btn-default btn-xs" type="button"><a href="/menuRemove?idx=<?=$idx?>">메뉴삭제</a></button>
                                                        </td>
                                                    </form>
                                                </tr>
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
                                    <form class="menuwrite" action="/boardAdd" method="POST">
                                        <label>게시판아이디
                                            <span class="color-red">*</span>
                                        </label>
                                        <input class="form-control margin-bottom-20" type="text" name="board_id">
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
                                            $board = DB::fetchAll("SELECT * FROM board WHERE uidx=? order by idx desc", array(user()->idx));
                                            foreach($board as $key => $value) {
                                                ?>
                                                <tr>
                                                    <td>
                                                        <?=$board[$key]->idx?>
                                                    </td>
                                                    <td>
                                                        <?=$board[$key]->board_id?>
                                                    </td>                                                
                                                    <td>
                                                        <button class="btn btn-default btn-xs" type="button"><a href="/boardRemove?idx=<?=$board[$key]->idx?>">게시판삭제</a></button>
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
                                            $user = DB::fetchAll("SELECT * FROM users", []);
                                            foreach($user as $key=>$value) {
                                                ?>
                                                <tr>
                                                <td>
                                                    <?=$user[$key]->idx?>
                                                </td>
                                                <td>
                                                    <?=$user[$key]->id?>
                                                </td>
                                                <td>
                                                    <?=$user[$key]->name?>
                                                </td>
                                                <td>
                                                    <?=$user[$key]->nickname?>
                                                </td> 
                                                <td>
                                                    <a href="http://127.0.0.1/<?=$user[$key]->name?>">http://127.0.0.1/<?=$user[$key]->name?></a>
                                                </td>                                                 
                                                <td>
                                                    <button class="btn btn-danger btn-xs" type="button">회원삭제</button>
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
