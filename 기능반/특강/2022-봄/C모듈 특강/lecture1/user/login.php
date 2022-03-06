<?php
require_once '../header.php';
?>
<h2 class="text-center">로그인 페이지</h2>
<form method="POST" action="/user/login_ok.php" class="row g-3">
    <div class="col-12">
        <label for="inputAddress" class="form-label">Address</label>
        <input type="text" class="form-control" id="user_id" name="id" placeholder="아이디">
    </div>
    <div class="col-12">
        <label for="inputAddress2" class="form-label">비밀번호</label>
        <input type="text" class="form-control" id="user_pw" name="pw" placeholder="Apartment, studio, or floor">
    </div>
    <div class="col-12 d-flex justify-content-end">
        <button type="submit" class="btn btn-primary">로그인</button>
    </div>
</form>
<?php
require_once('../footer.php');
?>