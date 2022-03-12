<?php
use src\App\DB;

function user() {
    return isset($_SESSION['user']) ? $_SESSION['user'] : false;
}

function redirect($msg, $url)
{
	echo "<script>alert('" . str_replace('<br>', '\n', $msg) . "')</script>";
	echo "<script>location.replace('" . $url . "')</script>";
	exit;
}

function back($msg)
{
	echo "<script>alert('" . str_replace('<br>', '\n', $msg) . "')</script>";
	echo "<script>history.back()</script>";
	exit;
}

function getBidx($menu) {
	$data = DB::fetch("SELECT * FROM menu WHERE idx = ?", array($menu));
	return $data->bidx;
}