<?php
session_start();
require_once('./db/db.php');
require_once('./db/session.php');

function session() {
    return new session();
}

function user() {
    return session()->get("user", true, true);
}

function redierct($msg, $url) {
    echo "<script>alert('" . $msg ."')</script>";
    echo "<script>window.location.href = '" . $url ."'</script>";
    exit;
}

function back($msg) {
    echo "<script>alert('" . $msg ."')</script>";
    echo "<script>history.back()</script>";
    exit;
}

function myMenu() {
    $query = "
    SELECT * FROM menu where uidx = ?
    ";
    $bind = array(user()->idx);
    $data = DB::fetchAll($query, $bind);
    return $data;
}

function myBoard() {
    $query = "
    SELECT * FROM board where uidx = ?
    ";
    $bind = array(user()->idx);
    $data = DB::fetchAll($query, $bind);
    return $data;
}

function userList() {
    $query = "
    SELECT * FROM users
    ";
    $bind = array();
    $data = DB::fetchAll($query, $bind);
    return $data;
}

function oneMenu() {
    $query = "
    SELECT * FROM menu where uidx = ?
    ";
    $bind = array(user()->idx);
    $data = DB::fetch($query, $bind);
    return $data;
}

function checkBoard($menu) {
    $query = "
    SELECT * FROM menu where idx = ? 
    ";
    $bind = array($menu);
    $data = DB::fetch($query, $bind);
    if($data->bidx !=0) {
        return $data;
    } else {
        return false;
    }
}

function getPost($menu) {
    $query = "
    SELECT * FROM post where bidx = ?
    ";
    $bind = array(checkBoard($menu)->bidx);
    $data = DB::fetchAll($query, $bind);
    return $data;
}

function morePost($idx) {
    $query = "
    SELECT * FROM post where idx = ?
    ";
    $bind = array($idx);
    $data = DB::fetch($query, $bind);
    return $data;
}

function getComment($idx) {
    $query = "
    SELECT * FROM comment where pidx = ?
    ";
    $bind = array($idx);
    $data = DB::fetchAll($query, $bind);
    return $data;
}