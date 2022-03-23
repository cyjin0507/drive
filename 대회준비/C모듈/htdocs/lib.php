<?php

use src\App\DB;

function checkInvalid($datas)
{
	foreach ($datas as $key => $data) {
		if (empty(trim($data))) {
			back('누락된 항목이 있습니다.');
		}
	}

	return $datas;
}

function view($pageName, $datas = [])
{
	extract($datas);

	require_once __VIEWS . __DS . "header.php";
	require_once __VIEWS . __DS . $pageName . ".php";
	require_once __VIEWS . __DS . "footer.php";
}

function user()
{
	return $_SESSION['user'];
}

function redirect($url, $msg)
{
	echo "<script>alert('" . $msg . "');</script>";
	echo "<script>window.location.href='" . $url . "';</script>";
	exit;
}

function back($msg)
{
	echo "<script>alert('" . $msg . "');</script>";
	echo "<script>history.back()</script>";
	exit;
}

function output($str)
{
	return str_replace(' ', '&nbsp;', str_replace('\n', '<br>', htmlentities($str)));
}

function returnJSON($obj, $responseCode = 200)
{
	http_response_code($responseCode);
	echo json_encode($obj, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
	exit;
}

function setReviewImage($imgFile, $maxWidth = 500, $maxHeight = 500, $text = "경상남도 특산품")
{
	list($imgWidth, $imgHeight) = getimagesize($imgFile);

	$simgWidth = $imgWidth;
	$simgHeight = $imgHeight;

	if ($imgWidth > $maxWidth) {
		$simgWidth = $maxWidth;
		$simgHeight = $imgHeight * $maxWidth / $imgWidth;
	}

	if ($simgHeight > $maxHeight) {
		$simgHeight = $maxHeight;
		$simgWidth = $imgWidth * $maxHeight / $imgHeight;
	}

	$imgIm = imagecreatefromjpeg($imgFile);
	$simgIm = imagecreatetruecolor($simgWidth, $simgHeight);
	imagecopyresampled($simgIm, $imgIm, 0, 0, 0, 0, $simgWidth, $simgHeight, $imgWidth, $imgHeight);

	if ($text) {
		$textColor = imagecolorallocatealpha($simgIm, 0, 0, 0, 100);
		$font = __ROOT . '/public/font/malgun.ttf';
		$textSize = 12;
		$textAngle = 0;
		$textBox = imageftbbox($textSize, $textAngle, $font, $text);
		$textX = $simgWidth / 2 - $textBox[4] / 2;
		$textY = $simgHeight / 2 - $textBox[5] / 2;
		imagettftext($simgIm, $textSize, $textAngle, $textX, $textY, $textColor, $font, $text);
	}

	imagejpeg($simgIm, $imgFile, 80);

	imagedestroy($imgIm);
	imagedestroy($simgIm);
}