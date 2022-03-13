<?php
use src\App\Route;

Route::get('/', 'ViewController@main');
// 유저
Route::get('/login', 'ViewController@login');
Route::post('/loginOk', 'ViewController@loginOk');
Route::get('/logout', 'ViewController@logout');

// 블로그 관리
Route::get('/preferences', 'SettingController@preferences');
Route::post('/menuAdd', 'SettingController@menuAdd');
Route::get('/menuRemove/{idx}', 'SettingController@menuRemove');
Route::post('/boardRegister', 'SettingController@boardRegister');
Route::post('/boardAdd', 'SettingController@boardAdd');
Route::get('/boardRemove/{idx}', 'SettingController@boardRemove');
Route::get('/userRemove/{idx}', 'BlogController@userRemove');

// 내 블로그
Route::get('/blog/{user_name}', 'BlogController@blog');
Route::get('/blog/{user_name}/{menu}', 'BlogController@blog2');
// P
Route::get('/blogWrite/{user_name}/{menu}/{idx}', 'BlogController@blogWrite');
Route::post('/blogWriteOk', 'BlogController@blogWriteOk');
Route::get('/blogView/{user_name}/{menu}/{idx}', 'BlogController@blogView');
Route::get('/blogReply/{user_name}/{menu}/{idx}', 'BlogController@blogReply');
Route::get('/blogModify/{user_name}/{menu}/{idx}', 'BlogController@blogModify');
Route::post('/blogModifyOk', 'BlogController@blogModifyOk');
Route::get('/blogRemove/{user_name}/{menu}/{idx}', 'BlogController@blogRemove');
Route::post('/commentAdd', 'BlogController@commentAdd');
