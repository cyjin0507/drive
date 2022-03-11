<?php
use src\App\Route;

Route::get('/', 'ViewController@main');
// 유저부분
Route::get('/login', 'ViewController@login');
Route::get('/join', 'ViewController@join');
Route::post('/loginOk', 'UserController@loginOk');
Route::get('/logout', 'UserController@logout');


// 내블로그 부분
Route::get('/blog/{user_name}/{menu}', 'BlogController@blog');
Route::get('/blogWrite/{user_name}/{menu}', 'BlogController@blogWrite');
Route::get('/blogView/{idx}/{menu}/{user_name}', 'BlogController@blogView');
Route::get('/blogReply/{idx}/{menu}/{user_name}', 'BlogController@blogReply');

// 프로세스
Route::post('/blogWriteOk', 'BlogController@blogWriteOk');
Route::post('/replyOk', 'BlogController@replyOk');

