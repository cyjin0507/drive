<?php
require_once('./db/lib.php');
session()->remove("user");
back("로그아웃 완료");