<?php
use src\App\DB;
function user() {
    return isset($_SESSION['user']) ? $_SESSION['user'] : false;
}

function redirect($msg, $url) {
    echo "<script>alert('".$msg."')</script>";
    echo "<script>window.location.href='".$url."'</script>";
    exit;
}

function back($msg) {
    echo "<script>alert('".$msg."')</script>";
    echo "<script>history.back()</script>";
    exit;
}

function getBoard($menu) {
    $data = DB::fetch("SELECT * FROM menu WHERE idx = ?", array($menu));
    return $data->bidx;
}