<?php

use src\App\Route;

Route::get('/' , "ViewController@main");

// 유저 부분
Route::get('/login' , "ViewController@login");
Route::post('/loginOk' , "UserController@loginOk");
Route::get('/logout' , "UserController@logout");
Route::get('/join' , "UserController@join");

// 내 블로그 부분
Route::get('/blog' , "BlogController@myblog");
Route::get('/blogView' , "BlogController@blogView");
Route::get('/blogReply' , "BlogController@blogReply");
Route::get('/blogModify' , "BlogController@blogModify");
Route::get('/blogWrite' , "BlogController@blogWrite");

// 내 블로그 부분 프로세스 영역
Route::post('/blogWriteOk' , "BlogController@blogWriteOk");
Route::post('/commentAdd' , "BlogController@commentAdd");
Route::post('/blogModifyOk' , "BlogController@blogModifyOk");
Route::post('/blogReplyOk' , "BlogController@blogReplyOk");
Route::get('/blogDeleteOk' , "BlogController@blogDeleteOk");
Route::get('/commentRemove' , "BlogController@commentRemove");


// 블로그 관리 부분
Route::get('/preferences' , "SettingController@preferences");
Route::post('/menuAdd' , "SettingController@menuAdd");
Route::post('/boardRegister' , "SettingController@boardRegister");
Route::get('/menuRemove' , "SettingController@menuRemove");
Route::post('/boardAdd' , "SettingController@boardAdd");
Route::get('/boardRemove' , "SettingController@boardRemove");