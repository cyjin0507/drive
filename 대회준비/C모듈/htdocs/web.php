<?php

use src\App\Route;

Route::get("/", "ViewController@mainPage");
Route::get("/specialityGoods", "ViewController@specialityGoodsPage");
Route::get("/event", "ViewController@eventPage");
Route::get("/purchaseReview", "ViewController@purchaseReviewPage");

Route::post("/api/event/applicants", "Api\\EventController@applicants");
Route::get("/api/event/{phone}/stamps", "Api\\EventController@stamps");

Route::post("/api/reviews", "Api\\ReviewController@addReview");
Route::get("/api/reviews", "Api\\ReviewController@getReviews");
Route::get("/api/reviews/{idx}", "Api\\ReviewController@getReview");

Route::get("/admin", "ViewController@adminLoginPage");
Route::post("/admin/login", "AdminController@login");

Route::get("/admin/specialityGoods", "ViewController@adminSpecialityGoodsPage", "admin");
Route::get("/admin/specialityGoods/modify/{idx}", "ViewController@modifySpecialityGoodsPage", "admin");

Route::post("/admin/modifySpecialityGoods", "AdminController@modifySpecialityGoods", "admin");
Route::get("/admin/event", "ViewController@adminEventPage", "admin");