<?php
session_start();

require_once('DB.php');
require_once('Session.php');

function validation($data) {
    foreach($data as $key=>$value) {
        if(trim($value) == "") {
            back("누락된 항목이 있습니다.");
        }
    }
}

function session() {
    return new session();
}

function user() {
    return session()->get("user", true, true);
}

function back($msg) {
    echo "<script>alert('".$msg."')</script>";
    echo "<script>history.back()</script>";
    exit;
}

function redirect($msg, $url) {
    echo "<script>alert('".$msg."')</script>";
    echo "<script>window.location.href='".$url."'</script>";
    exit;
}

function output($str) {
    return nl2br(str_replace('', "&nbsp;", htmlentities($str)));
}

function returnJson($obj) {
    echo json_decode($obj, JSON_UNESCAPED_UNICODE);
    exit;
}