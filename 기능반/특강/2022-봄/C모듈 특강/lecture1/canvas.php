<?php

header("Content-Type: image/png");

// 지정된 크기의 true 컬러 기반의 이미지를 생성 => (JS) new canvas(width, height);
$im = imagecreatetruecolor(200, 200);
$whiteColor = imagecolorallocate($im, 255, 255, 255);
imagesetthickness($im, 2);
imagerectangle($im, 20,20,50,50, $whiteColor);
imagerectangle($im, 70,20,100,50, $whiteColor);

imagearc($im, 60,80,80,40,0,180,$whiteColor);

imagestring($im, 5, 20, 150, "Smile Face", $whiteColor);


imagepng($im);
imagedestroy($im);