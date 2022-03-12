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
Route::get('/blogModify/{idx}/{menu}/{user_name}', 'BlogController@blogModify');

// 프로세스
Route::post('/blogWriteOk', 'BlogController@blogWriteOk');
Route::post('/replyOk', 'BlogController@replyOk');
Route::post('/ModifyOk', 'BlogController@ModifyOk');
Route::get('/deleteOk/{idx}/{menu}/{user_name}', 'BlogController@deleteOk');
Route::post('/commentAdd', 'BlogController@commentAdd');
Route::get('/commentRemove/{idx}', 'BlogController@commentRemove');


// 블로그 관리
Route::get('/preferences', 'SettingController@preferences');

// 블로그 관리 P
Route::post('/menuAdd', 'SettingController@menuAdd');
Route::post('/boardAdd', 'SettingController@boardAdd');
Route::get('/boardRemove/{$idx}', 'SettingController@boardRemove');
Route::get('/menuRemove/{$idx}', 'SettingController@menuRemove');
Route::post('/boardRegister', 'SettingController@boardRegister');
Route::get('/userRemove/{$idx}', 'SettingController@userRemove');
