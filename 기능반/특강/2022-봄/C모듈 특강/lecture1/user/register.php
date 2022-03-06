<?php
require_once '../header.php';
?>
<h2 class="text-center">회원가입 페이지</h2>
<form method="POST" action="/user/register_ok.php" class="row g-3">
    <div class="col-12">
        <label for="inputAddress" class="form-label">Address</label>
        <input type="text" class="form-control" name="user_id" placeholder="아이디">
    </div>
    <div class="col-12">
        <label for="inputAddress2" class="form-label">비밀번호</label>
        <input type="text" class="form-control" name="user_pw" placeholder="Apartment, studio, or floor">
    </div>
    <div class="col-12">
        <label for="inputAddress" class="form-label">이름</label>
        <input type="text" class="form-control" name="user_name" placeholder="아이디">
    </div>
    <div class="col-12 d-flex justify-content-end">
        <button type="submit" class="btn btn-primary">회원가입</button>
    </div>
</form>
<?php
require_once('../footer.php');
?>